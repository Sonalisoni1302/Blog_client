import axios from "axios";

export const filterPagination = async({create_new_arr = false, state, data, page, countRoute, data_to_snd = {}}) =>{
    let obj;

    if(state != null && !create_new_arr){
        obj = {...state, results : [...state.results, ...data], page:page}
    }else{
        await axios.post("http://localhost:5000" + countRoute, data_to_snd).then(({data : {totalDocs}}) => {
            console.log("Count response data:", data); // Log the count response
            obj = {results: data, page:1, totalDocs}
        }).catch(err => {
            console.log(err);
        })
    }

    return obj;     
}