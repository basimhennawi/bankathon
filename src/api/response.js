// Wrapper for all success response
export default (res, data) => {
  res.json({
    status: 200,
    data: {
      ...data,
      credential: res.credential || '12345678-1234-1234-1234-123456789012'
    },
    traceId: res.traceId || '245bcbd7b3cad60a13e2479527f4ebad'
  })
}
