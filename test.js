// const arr = [ {
//     "doctorId": "9",
//     "date":10 ,
//     "d":3 ,
//     "timeType": "T4"
// } , {
//     "doctorId": "9",
//     "date": 6 ,
//     "d":2 ,
//     "timeType": "T5"
// } ]

// var result = 0;

// for(let i = 0 ; i < arr.length -1; i++){
//     var a = arr[i].date * arr[i].d
//     result + a;
// }
// console.log(result)

var searchInsert = function(arr) {
    var res = 0;
    for(let i = 0; i< arr.length - 1 ; i++){
        
        res = res + (arr[i].date * arr[i].d)
    }
    return res * 0.8;
};

console.log(searchInsert([ {
    "doctorId": "9",
    "date":10 ,
    "d":3 ,
    "timeType": "T4"
} , {
    "doctorId": "9",
    "date": 6 ,
    "d":2 ,
    "timeType": "T5"
},{
    "doctorId": "9",
    "date": 6 ,
    "d":2 ,
    "timeType": "T5"
} ]
))