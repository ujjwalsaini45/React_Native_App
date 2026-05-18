import React, { useState, useEffect } from 'react'
import {
  StyleSheet, Text, View, TextInput,
  Pressable, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native'

const CreateScreen = ({ onAdd, onUpdate, editItem }) => {
  const [itemName, setItemName] = useState('')
  const [stockAmt, setStockAmt] = useState('')
  const [unit, setUnit]         = useState('kg')

  const units    = ['kg', 'g', 'L', 'pcs']
  const isEditing = editItem !== null && editItem !== undefined

  // Pre-fill fields when editing
  useEffect(() => {
    if (isEditing) {
      setItemName(editItem.name)
      setStockAmt(String(editItem.stock))
      setUnit(editItem.unit || 'kg')
    } else {
      setItemName('')
      setStockAmt('')
      setUnit('kg')
    }
  }, [editItem])

  const handleSubmit = () => {
    if (!itemName.trim() || !stockAmt.trim()) return
    if (isEditing) {
      onUpdate({ ...editItem, name: itemName.trim(), stock: Number(stockAmt), unit })
    } else {
      onAdd({ name: itemName.trim(), stock: Number(stockAmt), unit })
    }
    setItemName('')
    setStockAmt('')
    setUnit('kg')
  }

  const stockNum    = Number(stockAmt)
  const isDisabled  = !itemName.trim() || !stockAmt.trim()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>{isEditing ? '✏️' : '➕'}</Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>{isEditing ? 'Edit Item' : 'New Item'}</Text>
            <Text style={styles.sectionSub}>
              {isEditing ? `Editing "${editItem.name}"` : 'Add to your inventory'}
            </Text>
          </View>
        </View>

        {/* Item Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>ITEM NAME</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>📦</Text>
            <TextInput
              placeholder="e.g. Basmati Rice"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={itemName}
              onChangeText={setItemName}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Stock Amount */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>STOCK AMOUNT</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>🔢</Text>
            <TextInput
              placeholder="e.g. 25"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={stockAmt}
              onChangeText={setStockAmt}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Unit Selector */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>UNIT</Text>
          <View style={styles.unitRow}>
            {units.map((u) => (
              <Pressable
                key={u}
                style={[styles.unitChip, unit === u && styles.unitChipActive]}
                onPress={() => setUnit(u)}
              >
                <Text style={[styles.unitChipText, unit === u && styles.unitChipTextActive]}>
                  {u}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Live Preview Card */}
        {(itemName || stockAmt) ? (
          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>PREVIEW</Text>
            <View style={styles.previewRow}>
              <View style={styles.previewLeft}>
                <View style={[
                  styles.previewDot,
                  stockNum <= 5  && { backgroundColor: '#c0392b' },
                  stockNum > 5  && stockNum < 20 && { backgroundColor: '#b45309' },
                  stockNum >= 20 && { backgroundColor: '#2e7d32' },
                ]} />
                <View>
                  <Text style={styles.previewName}>{itemName || '—'}</Text>
                  <Text style={styles.previewUnit}>{unit}</Text>
                </View>
              </View>
              <View style={[
                styles.badge,
                stockNum <= 5  && styles.badgeLow,
                stockNum > 5  && stockNum < 20 && styles.badgeMid,
                stockNum >= 20 && styles.badgeGood,
              ]}>
                <Text style={[
                  styles.badgeText,
                  stockNum <= 5  && styles.badgeTextLow,
                  stockNum > 5  && stockNum < 20 && styles.badgeTextMid,
                  stockNum >= 20 && styles.badgeTextGood,
                ]}>
                  {stockAmt || '0'} {unit}
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {/* Submit Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            isEditing && styles.buttonEdit,
            isDisabled && styles.buttonDisabled,
            pressed && !isDisabled && styles.buttonPressed,
          ]}
          onPress={handleSubmit}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>
            {isEditing ? '💾  Save Changes' : '＋  Add to Inventory'}
          </Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  wrapper:    { flex: 1 },
  container:  { padding: 20, paddingBottom: 40 },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#1a3d2e',
    padding: 16, borderRadius: 14, marginBottom: 24,
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  icon:         { fontSize: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  sectionSub:   { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 },

  fieldGroup: { marginBottom: 18 },
  label: {
    fontSize: 11, fontWeight: '700', color: '#888',
    letterSpacing: 1.5, marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 0.5, borderColor: '#e5e5e0',
    paddingHorizontal: 14, paddingVertical: 2, gap: 10,
  },
  inputIcon: { fontSize: 16 },
  input: {
    flex: 1, fontSize: 15, fontWeight: '500',
    color: '#1a1a1a', paddingVertical: 13,
  },

  unitRow: { flexDirection: 'row', gap: 10 },
  unitChip: {
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 20, backgroundColor: '#fff',
    borderWidth: 0.5, borderColor: '#e5e5e0',
  },
  unitChipActive:     { backgroundColor: '#1a3d2e', borderColor: '#1a3d2e' },
  unitChipText:       { fontSize: 13, fontWeight: '600', color: '#666' },
  unitChipTextActive: { color: '#fff' },

  previewCard: {
    backgroundColor: '#fff', borderRadius: 12,
    padding: 16, borderWidth: 0.5, borderColor: '#e5e5e0', marginBottom: 20,
  },
  previewLabel: {
    fontSize: 10, fontWeight: '700', color: '#bbb',
    letterSpacing: 1.5, marginBottom: 10,
  },
  previewRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  previewLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  previewDot:  { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc' },
  previewName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  previewUnit: { fontSize: 11, color: '#aaa', marginTop: 1 },

  badge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  badgeLow:  { backgroundColor: '#fdecea' },
  badgeMid:  { backgroundColor: '#fff8e1' },
  badgeGood: { backgroundColor: '#e8f5e9' },
  badgeText: { fontSize: 13, fontWeight: '700' },
  badgeTextLow:  { color: '#c0392b' },
  badgeTextMid:  { color: '#b45309' },
  badgeTextGood: { color: '#2e7d32' },

  button: {
    backgroundColor: '#1a3d2e', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 4,
  },
  buttonEdit:     { backgroundColor: '#1d4ed8' },  // blue for edit mode
  buttonDisabled: { backgroundColor: '#b0c4b8' },
  buttonPressed:  { opacity: 0.85 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
})