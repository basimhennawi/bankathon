// Wrapper for all success response
export default (res, data) => {
  res.json({
    status: 200,
    data: {
      ...data,
      credential: res.credential || '38508b40-e349-4952-878e-4ccfebfc1cfe'
    },
    traceId: res.traceId || '245bcbd7b3cad60a13e2479527f4ebad'
  })
}
