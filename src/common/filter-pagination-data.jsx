import axios from "axios";

export const filterPagination = async({create_new_arr = false, state, data, page, countRoute, data_to_snd = { }}) =>{
    let obj;

    if(state != {results : []} && !create_new_arr){
        obj = {...state, results : [...state.results, ...data], page:page}
        console.log("obj" , obj);
    }else{
        await axios.post("http://localhost:5000" + countRoute, data_to_snd).then(({data}) => {
            // Log the count response
            console.log("data:", data);
            const totalDocs = data.totalDocs
            obj = {results: data, page:1, totalDocs}
            console.log("Count response data:", obj);
        }).catch(err => {
            console.log(err);
        })
    }

    return obj;     
}