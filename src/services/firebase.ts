export const getWishData = async (wishId: string) => {
  const result = await fetch(`${process.env.BASE_URL_API}/web/tim-web-landing-api/api/v1/wishes/${wishId}`, {
    cache: 'no-store',
  })

  return result.json()
}
