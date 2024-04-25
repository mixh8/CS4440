import { post, get } from 'aws-amplify/api'
interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: any
}

export async function getKSimilar(ticker: string, k: number, unix_time: number): Promise<ApiResponse<any>> {
    try {
        /**
         * Example request:
         *    ticker = "ETR"
         *    k = 5
         *    unix_time = 1356998400
         */
        console.log("Getting K similar stocks for " + ticker)
        const searchOperation = get({
            apiName: 'stockSearch',
            path: '/ticker',
            options: {
                queryParams: {
                    ticker: ticker,
                    k: k.toString(),
                    unix_time: unix_time.toString()
                }
            },
        })


        const { body } = await searchOperation.response
        const response = await body.json()
        console.log("Search successful", response)
        return { success: true, data: response }
    } catch (error) {
        console.error("Error searching for similar stocks: ", error)
        return { success: false, error: error }
    }
}