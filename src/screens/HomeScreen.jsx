import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import AllItem from './AllItem'
import CreateScreen from './CreateScreen'

const initialData = [
  { id: 1, name: "Wheat",        stock: 5,  unit: "kg" },
  { id: 2, name: "Rice",         stock: 15, unit: "kg" },
  { id: 3, name: "Basmati Rice", stock: 25, unit: "kg" },
  { id: 4, name: "Pulse",        stock: 50, unit: "kg" },
  { id: 5, name: "Corn",         stock: 19, unit: "kg" },
]

const HomeScreen = () => {
  const [view, setView]   = useState(0)
  const [data, setData]   = useState(initialData)
  const [editItem, setEditItem] = useState(null)   // item being edited

  const lowStockItems = data.filter(item => item.stock < 20)

  // ── called from CreateScreen ──────────────────────────────
  const handleAdd = (newItem) => {
    setData(prev => [...prev, { ...newItem, id: Date.now() }])
    setView(0)   // go back to All Items after adding
  }

  // ── called from AllItem ───────────────────────────────────
  const handleDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id))
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setView(2)   // open CreateScreen in edit mode
  }

  const handleUpdate = (updatedItem) => {
    setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item))
    setEditItem(null)
    setView(0)
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {/* ── HEADER ───────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerCircle1} />
        <View style={styles.headerCircle2} />
        <Text style={styles.subtitle}>INVENTORY</Text>
        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{data.length}</Text>
            <Text style={styles.statLabel}>Total items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#f9a825' }]}>{lowStockItems.length}</Text>
            <Text style={styles.statLabel}>Low stock</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#6ee7b7' }]}>
              {data.filter(i => i.stock >= 20).length}
            </Text>
            <Text style={styles.statLabel}>In stock</Text>
          </View>
        </View>
      </View>

      {/* ── QUICK ACTIONS ────────────────────────────────── */}
      <View style={styles.body}>
        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>

        <Pressable
          style={[styles.actionCard, view === 0 && styles.activeCard]}
          android_ripple={{ color: '#eee' }}
          onPress={() => { setEditItem(null); setView(0) }}
        >
          <View style={[styles.iconBox, { backgroundColor: view === 0 ? '#1a3d2e' : '#e8f5e9' }]}>
            <Text style={{ fontSize: 18 }}>📦</Text>
          </View>
          <View style={styles.actionText}>
            <Text style={[styles.actionTitle, view === 0 && { color: '#fff' }]}>All Items</Text>
            <Text style={[styles.actionSub,   view === 0 && { color: 'rgba(255,255,255,0.6)' }]}>
              {data.length} items in inventory
            </Text>
          </View>
          <Text style={[styles.chevron, view === 0 && { color: '#fff' }]}>›</Text>
        </Pressable>

        <Pressable
          style={[styles.actionCard, view === 1 && styles.activeCard]}
          android_ripple={{ color: '#eee' }}
          onPress={() => { setEditItem(null); setView(1) }}
        >
          <View style={[styles.iconBox, { backgroundColor: view === 1 ? '#1a3d2e' : '#fff8e1' }]}>
            <Text style={{ fontSize: 18 }}>⚠️</Text>
          </View>
          <View style={styles.actionText}>
            <Text style={[styles.actionTitle, view === 1 && { color: '#fff' }]}>Low Stock</Text>
            <Text style={[styles.actionSub,   view === 1 && { color: 'rgba(255,255,255,0.6)' }]}>
              {lowStockItems.length} items need attention
            </Text>
          </View>
          <View style={[styles.badge, view === 1 && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={[styles.badgeText, view === 1 && { color: '#fff' }]}>
              {lowStockItems.length}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.actionCard, styles.actionCardDark, view === 2 && styles.activeCard]}
          onPress={() => { setEditItem(null); setView(2) }}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
            <Text style={{ fontSize: 18 }}>➕</Text>
          </View>
          <View style={styles.actionText}>
            <Text style={[styles.actionTitle, { color: '#fff' }]}>Create New Item</Text>
            <Text style={[styles.actionSub,   { color: 'rgba(255,255,255,0.5)' }]}>Add to inventory</Text>
          </View>
        </Pressable>
      </View>

      {/* ── VIEWS ────────────────────────────────────────── */}
      {view === 0 && (
        <AllItem
          data={data}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      {view === 1 && (
        <AllItem
          data={lowStockItems}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      {view === 2 && (
        <CreateScreen
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editItem={editItem}       // null = create mode, item = edit mode
        />
      )}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: '#f4f4f0' },
  header: {
    backgroundColor: '#1a3d2e',
    paddingTop: 60, paddingBottom: 28, paddingHorizontal: 24,
    overflow: 'hidden', position: 'relative',
  },
  headerCircle1: {
    position: 'absolute', top: -40, right: -30,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  headerCircle2: {
    position: 'absolute', bottom: -25, right: 40,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  subtitle: {
    fontSize: 11, color: 'rgba(255,255,255,0.5)',
    letterSpacing: 2, marginBottom: 4, fontWeight: '500',
  },
  title: {
    fontSize: 28, fontWeight: '700', color: '#fff',
    letterSpacing: -0.5, marginBottom: 20,
  },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12, padding: 12, alignItems: 'center',
  },
  statNumber: { fontSize: 20, fontWeight: '700', color: '#fff' },
  statLabel: {
    fontSize: 10, color: 'rgba(255,255,255,0.5)',
    marginTop: 2, textAlign: 'center',
  },
  body: { padding: 20, gap: 10 },
  sectionLabel: {
    fontSize: 11, color: '#888',
    letterSpacing: 1.5, fontWeight: '500', marginBottom: 4,
  },
  actionCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    borderWidth: 0.5, borderColor: '#e5e5e0', marginBottom: 10,
  },
  actionCardDark: { backgroundColor: '#1a3d2e', borderWidth: 0 },
  activeCard:     { backgroundColor: '#1a3d2e', borderColor: '#1a3d2e' },
  iconBox: {
    width: 40, height: 40, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  actionText: { flex: 1 },
  actionTitle: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  actionSub:   { fontSize: 12, color: '#888', marginTop: 1 },
  chevron:     { fontSize: 22, color: '#bbb', fontWeight: '300' },
  badge: {
    backgroundColor: '#fff8e1',
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#b45309' },
})