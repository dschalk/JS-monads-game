
  var fib2 = function fib2 (v) {
      if (v[2] > 1) {mM$fib.ret([v[1], v[0] + v[1], v[2] -1])}
      else {
        console.log(v[0]);
        mM19.ret(v[0]);
      }
  };

  const fibPress$ = sources.DOM
    .select('input#code').events('keydown');

  const fibPressAction$ = fibPress$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      mM21.ret(e.target.value);
      fib2([0, 1, e.target.value]);
    }
    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
      mM19.ret("You didn't provide an integer");
    }
  });
// ************************************************************************* ENDOM iginal Fibonacci END

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB  
  
  const fibKeyPress5$ = sources.DOM
    .select('input#fib92').events('keydown');

  const primeFib$ = fibKeyPress5$.map(e => {
    if( e.keyCode == 13 ) {
      var res = fibsMonad
      .run([0, 1, e.target.value, []])
      .bnd(fibsState => fibsMonad
      .bnd(fpTransformer, primesMonad)
      .bnd(primesState => tr3(fibsState[3],primesState[3])))
      document.getElementById('PF_9').innerHTML = res[0];
      document.getElementById('PF_22').innerHTML = res[1];
      document.getElementById('primeFibs').innerHTML = res[2];
    }
  });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM basic prime END
  
  
// <>>><>><><><><>>>><><><   prime factors   ><><><><><><>>><<><><><><><><>< START prime factors  
  
  const factorsPress$ = sources.DOM
    .select('input#factors_1').events('keydown');

  const factorsAction$ = factorsPress$.map(e => {
    mMfactors.ret(e.target.value);
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      var message;
      var factors = primesMonad.run([primesMonad.s[0], [], e.target.value, primesMonad.a])
      .bnd(prFactTransformer, factorsMonad).s[1];
      if (e.target.value == factors.slice().pop()){
        message = e.target.value + ' is a prime number'
      }
      else {
        message = 'The prime factors of ' + e.target.value + ' are ' + factors;
      }
      document.getElementById('factors_3').innerHTML = message;
    }
  });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END

// ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal  

  window.onload = function (event) {
    console.log('onopen event: ', event);
    // document.querySelector('input#login').focus();
    mMitterfib5.release(200);
    // mM$prime5.ret([[2], 3, 3]);
  };
// <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< ENDOM traversal  
// <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START Itterator  

  const testZ = sources.DOM
    .select('#testZ').events('click')
  const testZAction$ = testZ.map(() =>
    mMZ1.release(1));                                

  const testQ = sources.DOM
    .select('#testQ').events('click')
  const testQAction$ = testQ.map(() => {
    mMt1.ret(0).bnd(v => mMZ2.release(v))})

  const testW = sources.DOM
    .select('#testW').events('keypress')
  const testWAction$ = testW.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ2.release(e.target.value)
    }
  });

  var solve = function solve () {
    mMZ3.bnd(a => 
    mMtemp.ret(a)           
    .bnd(display, 'quad4', '')         
    .bnd(display, 'quad6', '')         
    .bnd(display,'quad5', a + " * x * x ")
    .bnd(a => mMZ3    // Blocks here until new user input comes in.
    .bnd(b =>  mMtemp.ret(b)
    .bnd(display, 'quad6', b + ' * x ').bnd(b => mMZ3  // Blocks again.
    .bnd(c => mMtemp.ret([a,b,c]).bnd(fmap, qS4, "mMtemp")
    .bnd(v => {  
      let x = v[0]
      let y = v[1]
      console.log('Here is x and y: ', x, y)
    mMtemp.bnd(display, 'quad4', "Results: " + x + " and  " + y)  
    .bnd(display, 'quad5', p(a).text + " * " + x + " * " + x + " + " + p(b).text + 
            " * " + x + " " + p(c).text + " = 0")
    .bnd(display, 'quad6', p(a).text + " * " + y + " * " + y + " + " + p(b).text + 
            " * " + y + " " + p(c).text + " = 0")   
    solve();  
    } ) ) ) ) ) ) 
  };

  solve();

  const quad$ = sources.DOM
    .select('#quad').events('keypress')

  const quadAction$ = quad$.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ3.release(e.target.value)  
      document.getElementById('quad').value = '';
    }
  });

  const dummyClick$ = sources.DOM
    .select('#dummy').events('click');

  const dummyAction$ = dummyClick$.map(e => {
    mMdummy.bnd(add, 1, mMdummy);
    console.log('<><><><><><><><><> In dummyAction$ e is: ', e);
    console.log(document.getElementById('dummy').click);
    console.log('<><><><><><><><><>');
    var next = mM23.x[mM23.x.length - 1]*1 +  mM23.x[mM23.x.length - 2]*1 
    mM23.bnd(push, next , mM23);
    document.getElementById('dummy2').innerHTML = mM23.x;
  });

