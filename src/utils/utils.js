const isPC=(phone)=> {//是否是PC
    if(phone){return navigator.userAgent.match(/(iPhone|iPad|iPod)/i)};
    return !navigator.userAgent.match(/(iPhone|iPad|iPod|Android|Windows Phone|SymbianOS)/i);
}

export {
    isPC
}