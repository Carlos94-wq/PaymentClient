interface ApiResponse<T>{
    metadata: {
        currentPage: number,
        pageSize: number,
        totalPages:number,
        totalCount: number
    },
    data: T;
}

export default ApiResponse;