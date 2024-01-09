export const GET=async (url:string)=>{
    const data=await fetch(`${url}`);
    return data.json();
}