interface Props {
  user: string
  amount: number
  text: string
  animClass: string
}

export function DonationMessage({ user, amount, text, animClass }: Props) {
  return (
    <div
      className={animClass}
      style={{
        padding: '8px 12px',
        borderRadius: '8px',
        marginBottom: '6px',
        background: 'rgba(245,158,11,0.1)',
        border: '1px solid rgba(245,158,11,0.25)',
        fontSize: '0.8rem',
      }}
    >
      <span style={{ marginRight: '6px' }}>❤️</span>
      <span style={{ color: '#f59e0b', fontWeight: 700, marginRight: '4px' }}>{user}</span>
      <span style={{ color: 'rgba(245,158,11,0.7)', marginRight: '6px' }}>
        {amount} THB
      </span>
      <span style={{ color: '#e5e5e5' }}>{text}</span>
    </div>
  )
}
