import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native'

const AllItem = ({ data, onDelete, onEdit }) => {

  const confirmDelete = (item) => {
    Alert.alert(
      'Delete Item',
      `Remove "${item.name}" from inventory?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(item.id) },
      ]
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Item</Text>
        <Text style={styles.headingText}>Stock</Text>
        <Text style={styles.headingText}>Actions</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={[
            styles.itemContainer,
            { backgroundColor: item.stock < 20 ? '#fff5f5' : '#f6fff0' }
          ]}>
            {/* Left — name + unit */}
            <View style={styles.itemLeft}>
              <View style={[
                styles.dot,
                item.stock <= 5  && { backgroundColor: '#c0392b' },
                item.stock > 5  && item.stock < 20 && { backgroundColor: '#b45309' },
                item.stock >= 20 && { backgroundColor: '#2e7d32' },
              ]} />
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUnit}>{item.unit}</Text>
              </View>
            </View>

            {/* Middle — stock badge */}
            <View style={[
              styles.badge,
              item.stock <= 5  && styles.badgeLow,
              item.stock > 5  && item.stock < 20 && styles.badgeMid,
              item.stock >= 20 && styles.badgeGood,
            ]}>
              <Text style={[
                styles.badgeText,
                item.stock <= 5  && styles.badgeTextLow,
                item.stock > 5  && item.stock < 20 && styles.badgeTextMid,
                item.stock >= 20 && styles.badgeTextGood,
              ]}>
                {item.stock}
              </Text>
            </View>

            {/* Right — edit + delete buttons */}
            <View style={styles.actions}>
              <Pressable
                style={styles.editBtn}
                onPress={() => onEdit(item)}
              >
                <Text style={styles.editBtnText}>✏️</Text>
              </Pressable>
              <Pressable
                style={styles.deleteBtn}
                onPress={() => confirmDelete(item)}
              >
                <Text style={styles.deleteBtnText}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySub}>Add some items to your inventory</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

export default AllItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f0',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a3d2e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  headingText: {
    fontSize: 11, fontWeight: '700', color: '#fff',
    letterSpacing: 1, textTransform: 'uppercase',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#e5e5e0',
  },

  // Left section
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc' },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  itemUnit: { fontSize: 11, color: '#aaa', marginTop: 1 },

  // Badge
  badge: {
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4,
    minWidth: 42, alignItems: 'center',
  },
  badgeLow:  { backgroundColor: '#fdecea' },
  badgeMid:  { backgroundColor: '#fff8e1' },
  badgeGood: { backgroundColor: '#e8f5e9' },
  badgeText: { fontSize: 13, fontWeight: '700' },
  badgeTextLow:  { color: '#c0392b' },
  badgeTextMid:  { color: '#b45309' },
  badgeTextGood: { color: '#2e7d32' },

  // Action buttons
  actions: { flexDirection: 'row', gap: 6, marginLeft: 8 },
  editBtn: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8, padding: 8,
  },
  editBtnText: { fontSize: 14 },
  deleteBtn: {
    backgroundColor: '#fdecea',
    borderRadius: 8, padding: 8,
  },
  deleteBtnText: { fontSize: 14 },

  // Empty state
  emptyContainer: { alignItems: 'center', paddingVertical: 50 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 4 },
  emptySub:  { fontSize: 12, color: '#aaa' },
})