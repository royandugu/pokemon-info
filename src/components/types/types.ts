type statType={
    base_stat:number,
    effort:number,
    stat:{name:string}
}
export type indvDataType={
    sprite:string,
    abilities:Array<{ability:{name:string}}>,
    height:number,
    order:number,
    base_experience:string,
    name:string,
    stats:Array<statType>,
    types:Array<{type:{name:string}}>
}