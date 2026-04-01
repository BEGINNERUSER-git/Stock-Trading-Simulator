export const currency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(
    Number(value || 0),
  )

export const percent = (value) => `${Number(value || 0).toFixed(2)}%`

export const compactNumber = (value) =>
  new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(value || 0))
