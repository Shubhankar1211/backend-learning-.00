/*const input = [1,2,3,4]

function transform(i){
    return i*2;
}

const ans = input.map(transform)
console.log(ans);
*/

const input2 = [1,2,3,4,5,6,7,8]
function evenodd(n){
  if(n%2 == 0){
    return true
  }else{
    return false
  }
}


const ans1 = input2.filter(evenodd)
console.log(ans1);
