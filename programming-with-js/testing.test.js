
test('Test add5 plus 5', ()=>{
    expect(add5(5)).toBe(10)
})

function add5(val){
    return val + 5;
}