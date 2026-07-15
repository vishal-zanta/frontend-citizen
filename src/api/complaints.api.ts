import instance from "@/lib/axios"

export const getComplaints = (params = {})=> {
    return instance.get("/grievances/citizen", {params})
}
export const getComplaintById = (params :any)=> {


    return instance.get(`/grievances/citizen/${params?._id}`, {params })
}


export const postComplaints = (data : any)=> {
    return instance.post("/grievances/citizen", data)
}

export const postComplaintFeedback = ({ id, data }: { id: string; data: { rating: number; feedbackText: string } }) => {
    return instance.post(`/grievances/citizen/${id}/feedback`, data)
}