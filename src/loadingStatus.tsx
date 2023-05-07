export default function LoadingStatus({ value = false }) {
  const label = value ? 'done' : 'loading...';
  return (
    <span
      style={{
        color: value ? 'green' : 'red',
        fontWeight: 'bold',
      }}
    >
      {label}
    </span>
  );
}
