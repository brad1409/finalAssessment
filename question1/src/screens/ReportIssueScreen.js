import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

const categories = ['Delay', 'Safety', 'Overcharging', 'Vehicle condition', 'Other'];
const emptyForm = { name: '', phone: '', category: '', description: '' };
export default function ReportIssueScreen({ route }) {
  const { routeId, routeName } = route.params;
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const change = (field, value) => {
    setForm(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
  };
  const submit = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Enter your name.';
    if (!/^0\d{9}$/.test(form.phone)) nextErrors.phone = 'Use 10 digits starting with 0, e.g. 0821234567.';
    if (!form.category) nextErrors.category = 'Choose an issue category.';
    if (form.description.trim().length < 20) nextErrors.description = 'Write at least 20 characters describing the problem.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const report = { routeId, ...form, name: form.name.trim(), description: form.description.trim(), submittedAt: new Date().toISOString() };
    setReceipt(report);
    setForm({ ...emptyForm });
    Alert.alert('Report recorded', 'Your report has been created on this device.');
  };
  return <SafeAreaView style={styles.page}><KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <Text style={styles.title}>Report a problem</Text>
      <Text style={styles.sub}>Help us keep route information useful.</Text>
      <View style={styles.routeBox}><Text style={styles.small}>SELECTED ROUTE · {routeId}</Text><Text style={styles.routeName}>{routeName}</Text></View>
      {receipt && <View style={styles.confirm}><Text style={styles.confirmTitle}>Report created</Text>
        <Text style={styles.confirmText}>Route {receipt.routeId} · {receipt.category}</Text>
        <Text style={styles.confirmText}>Submitted {new Date(receipt.submittedAt).toLocaleString('en-ZA')}</Text>
        <Text style={styles.confirmText}>Recorded locally. No report was sent to a transport operator.</Text>
      </View>}
      <Field label="Your name" error={errors.name} value={form.name} onChangeText={value => change('name', value)} placeholder="Name and surname" />
      <Field label="Cellphone number" error={errors.phone} value={form.phone} onChangeText={value => change('phone', value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="0821234567" keyboardType="phone-pad" maxLength={10} />
      <Text style={styles.label}>What went wrong?</Text>
      <View style={styles.categories}>{categories.map(category => <Pressable key={category} onPress={() => change('category', category)}
        style={[styles.chip, form.category === category && styles.selected]}><Text style={[styles.chipText, form.category === category && styles.selectedText]}>{category}</Text></Pressable>)}</View>
      {errors.category && <Text style={styles.error}>{errors.category}</Text>}
      <Field label="Describe the problem" error={errors.description} value={form.description} onChangeText={value => change('description', value)}
        placeholder="Tell us what happened and where..." multiline numberOfLines={5} style={{ minHeight: 120, textAlignVertical: 'top' }} />
      <Text style={styles.hint}>{form.description.trim().length} characters · minimum 20</Text>
      <Pressable onPress={submit} style={styles.button}><Text style={styles.buttonText}>Submit report</Text></Pressable>
    </ScrollView>
  </KeyboardAvoidingView></SafeAreaView>;
}
function Field({ label, error, style, ...props }) {
  return <View><Text style={styles.label}>{label}</Text><TextInput {...props} placeholderTextColor={colors.muted}
    style={[styles.input, style, error && styles.inputError]} />{error && <Text style={styles.error}>{error}</Text>}</View>;
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingBottom: 42 },
  title: { fontSize: 28, fontWeight: '800', color: colors.navy, marginTop: 12 },
  sub: { color: colors.muted, fontSize: 14, marginTop: 6 },
  routeBox: { backgroundColor: colors.paleGreen, borderRadius: 12, padding: 15, marginTop: 22 },
  small: { fontSize: 11, color: colors.green, fontWeight: '800', letterSpacing: 1 },
  routeName: { fontSize: 15, color: colors.navy, fontWeight: '700', marginTop: 7 },
  label: { fontSize: 14, color: colors.text, fontWeight: '700', marginTop: 22, marginBottom: 9 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 11, padding: 13, fontSize: 15, color: colors.text },
  inputError: { borderColor: colors.red }, error: { fontSize: 12, color: colors.red, marginTop: 6 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18 },
  selected: { backgroundColor: colors.navy, borderColor: colors.navy }, chipText: { fontSize: 13, color: colors.text },
  selectedText: { color: colors.white, fontWeight: '700' },
  hint: { fontSize: 12, color: colors.muted, marginTop: 7 },
  button: { backgroundColor: colors.navy, borderRadius: 12, alignItems: 'center', padding: 16, marginTop: 28 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  confirm: { padding: 15, backgroundColor: colors.paleGreen, borderRadius: 12, marginTop: 18 },
  confirmTitle: { color: colors.green, fontSize: 16, fontWeight: '800' },
  confirmText: { color: colors.text, fontSize: 13, marginTop: 6, lineHeight: 19 },
});
