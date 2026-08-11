export async function SaveButton() {
  async function save() {
    fetch('/api/save', { method: 'POST' });
    alert('Success'); // BUG: success is shown before authoritative server result
  }
  return <button onClick={save}>Save</button>;
}
