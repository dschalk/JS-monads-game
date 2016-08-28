import Cycle from '@motorcycle/core';
import {h, p, span, h1, h2, h3, br, div, label, input, hr, makeDOMDriver} from '@motorcycle/dom';
import {just, create, merge, combine, fromEvent, periodic, observe, delay, filter, of} from 'most';

import code from './code.js';

function createWebSocket(path) {
    let host = window.location.hostname;
    if(host == '') host = 'localhost';
    let uri = 'ws://' + host + ':3055' + path;
    let Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

const socket = createWebSocket('/');

console.log('########## socket: ', socket );

const websocketsDriver = function () {
    return create((add) => {
      socket.onmessage = msg => add(msg)
    })
}

socket.onmessage = function (event) {
  console.log(event);
}

socket.onclose = function (event) {
  console.log(event);
}

function main(sources) {
  mMindex.ret(0);

  const messages$ = (sources.WS).map(e => {
    mMtem.ret(e.data.split(',')).bnd(v => {
    console.log('<><><><><><><><><><><><><><><><>  INCING  <><><><><><><> >>> In messages. v is ', v );
    mMZ10.bnd(() => mM1.ret(v.slice(3)).bnd(y => game([pMscore.x, pMgoals.x, y, mM3.x].concat(y))));
    mMZ11.bnd(() => socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + pMscore + ',' + pMgoals))
    mMZ12.bnd(() => mM6.ret(v[2] + ' successfully logged in.'))
    mMZ13.bnd(() => updateMessages(v))
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + v[2] ))
    mMZ15.bnd(() => mMgoals2.ret('A player named ' + v[2] + ' is currently logged in. Page will refresh in 4 seconds.')
    .bnd(refresh))
    mMZ16.bnd(() => {if (pMname.x != v[2]) {mMgoals2.ret(v[2] + v[3])}})
    mMZ17.bnd(() => {
      if (v[3] == 'no file') {
        mMtaskList.ret([])
      } 
      else {
        process(e.data)
      }
    })
    mMZ18.bnd(() => {if (pMname == v[2]) playersMonad.run([v[3], v[4]])}) 
    mMZ19.bnd(() => {
      sMplayers.clear();
      let namesL = e.data.split("<br>")
      let namesList = namesL.slice(1)
      updateScoreboard2(namesList)
      namesList.forEach(player => sMplayers.add(player.trim()))
      game2()
      console.log('In mMZ19 <><><><><><> namesL, and namesList are ', namesL, namesList )
    }) })
       mMtemp.ret(e.data.split(',')[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'XX#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)
      .bnd(next, 'DE#$42', mMZ16)
     // .bnd(next, 'DD#$42', mMZ17)
      .bnd(next, 'CG#$42', mMZ18)
      .bnd(next, 'NN#$42', mMZ19)
  });

  const updateMessages = function updateMessages (ar) {
    console.log('In updateMessages ar is >>>>>>>>>>>>>>', ar );
    var sender = ar[2];
    mMhelper.ret(ar)
      .bnd(splice, 0, 3, mMhelper)
      .bnd(reduce)
      .bnd(v => mMmsg.bnd(unshift, h('div', sender + ': ' + v), mMmsg));
    console.log('In updateMessages ', socket.readyState);
  }

  const loginPress$ = sources.DOM
    .select('input#login').events('keypress');

  const loginPressAction$ = loginPress$.map(e => {
    var v = (e.target.value);
    if (v == '' ) {
      return;
    } 
    if( e.keyCode == 13 ) {
      socket.send("CC#$42" + e.target.value);
      pMname.ret(e.target.value).bnd(() => game2());
      mM3.ret([]).bnd(mM2.ret);
      document.getElementById('dice').style.display = 'block';
      document.getElementById('rightPanel').style.display = 'block';
      document.getElementById('log1').style.display = 'none';
      document.getElementById('log2').style.display = 'block';
      document.getElementById('gameDiv2').style.display = 'block';
      console.log('In loginPressAction$ ', socket.readyState);
    }
  });

  const groupPress$ = sources.DOM
    .select('input#group').events('keypress');

  const groupPressAction$ = groupPress$.map(e => {
    if( e.keyCode == 13 ) {
      pMgroup.ret(e.target.value);
      playerMonad.run([0, 0])
      socket.send('CO#$42,' + pMgroup.x  + ',' + pMname.x + ',' + e.target.value); 
      game2();
      console.log('In groupPressAction$ ', socket.readyState);
      socket.send('CG#$42,' +  pMgroup.x  + ',' + pMname.x + ',' + 0 + ',' + 0); 
    }
  });

  const messagePress$ = sources.DOM
    .select('input.inputMessage').events('keydown');

  const messagePressAction$ = messagePress$.map(e => {
    if( e.keyCode == 13 ) {
      socket.send(`CD#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
      e.target.value = '';
      console.log('In messagePressAction$ ', socket.readyState);
    }
  });

  const chatClick$ = sources.DOM
    .select('#chat2').events('click');

  const chatClickAction$ = chatClick$.map(() => {
    var el = document.getElementById('chatDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
  });
     
  const captionClick$ = sources.DOM
    .select('#caption').events('click');

  const captionClickAction$ = captionClick$.map(() => {
    var el = document.getElementById('captionDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
  });
// **************************************   GAME   *********************************************** GAME START
 var updateScoreboard2 = function updateScoreboard(v) {
   let ar = [] 
   for (let k of v) {
     ar.push(['  '+k]) 
   };
   return mMscoreboard.ret(ar);
  };

  const gameClick$ = sources.DOM
    .select('#game').events('click');

  const gameClickAction$ = gameClick$.map(() => {
    var el = document.getElementById('gameDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
    
    var el2 = document.getElementById('gameDiv2');
    (el2.style.display == 'none') ?
    el2.style.display = 'inline' :
    el2.style.display = 'none' 
  });
     
  const rollClick$ = sources.DOM
    .select('.roll').events('click');

  const rollClickAction$ = rollClick$.map(e => {  
    socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20')
    mM3.ret([])
    pMscore.bnd(add, -1, pMscore).bnd(v =>
    socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + v + ',' + mMgoals.x))
  });
 
  const numClick$ = sources.DOM
    .select('.num').events('click');
     
  const numClickAction$ = numClick$.map(e => {
    if (mM3.x.length < 2) {
      mM3.bnd(push, e.target.innerHTML, mM3).bnd(nums =>
      mM1.bnd(splice, e.target.id, 1, mM1).bnd(nums2 =>
      game([pMscore.x, pMgoals.x, nums2, nums].concat(nums2))))
    }
    if (mM3.x.length === 2 && mM8.x !== 0) {
      updateCalc();
    }
  }).startWith([0,0,0,0]);
    
  const opClick$ = sources.DOM
    .select('.op').events('click');
 
  const opClickAction$ = opClick$.map(e => {
    mM8.ret(e.target.textContent);
    if (mM3.x.length === 2) {
      updateCalc();
    }
  })
 
  const forwardClick$ = sources.DOM
    .select('#forward').events('click');
 
  const backClick$ = sources.DOM
    .select('#back').events('click');
 
  const forwardAction$ = forwardClick$.map(() => {
    if (mMindex.x < (mMhistory.x.length - 1)) {
      mMindex.bnd(add, 1, mMindex)
      .bnd(v => trav(v))
    }
  });
 
  const backAction$ = backClick$.map(() => {
    if (mMindex.x > 0) {
      mMindex.bnd(add, -1, mMindex)
      .bnd(v => trav(v))
      socket.send('DE#$42,' + pMgroup.x + ',' + pMname.x + ', clicked the BACK button. ');
    }
  });

  var game = function game (z) {
    var x = z.slice();
    mMindex.bnd(add, 1, mMindex)
     .bnd(i => mMhistory.bnd(spliceAdd, i, x, mMhistory))
      document.getElementById('0').innerHTML = x[4];  
      document.getElementById('1').innerHTML = x[5];  
      document.getElementById('2').innerHTML = x[6];  
      document.getElementById('3').innerHTML = x[7]; 
      game2();
      cleanup();
  };

  var game2 = function game2 () {
      document.getElementById('sb1').innerHTML = 'Name: ' +  pMname.x;
      document.getElementById('sb2').innerHTML = 'Group: ' + pMgroup.x
      document.getElementById('sb5').innerHTML = 'Currently online: Name | score | goals';
      document.getElementById('sb6').innerHTML = mMscoreboard.x      
      cleanup();
  };
 
  var trav = function trav (index) {       
    document.getElementById('0').innerHTML = mMhistory.x[index][4]; 
    document.getElementById('1').innerHTML = mMhistory.x[index][5]; 
    document.getElementById('2').innerHTML = mMhistory.x[index][6]; 
    document.getElementById('3').innerHTML = mMhistory.x[index][7];
   
    let a = mMhistory.x[index];
    mM1.ret(a[2]);
    mM3.ret(a[3]);
    socket.send('CG#$42,' +  pMgroup.x  + ',' + pMname.x + ',' + a[0] + ',' + a[1]); 
    mM8.ret(0);
    cleanup();
  };

  function changeS (ar, name) {
    var x = ar.filter(v => v.split("|")[0].trim() != pMname.x)
    return x
  }

  function updateCalc() { 
    mM3.bnd(x => 
    mM7.ret(calc(x[0], mM8.x, x[1])).bnd(result => {
    mM1.bnd(push, result, mM1)
    .bnd(nums => game([pMscore.x, pMgoals.x, nums, []].concat(nums)))
      if (result == 20) {score(pMscore.x*1 + 1)} 
      if (result == 18) {score(pMscore.x*1 + 3)}
      })) ;
    reset()
  };

  function cleanup (x) {
      let target0 = document.getElementById('0');
      let target1 = document.getElementById('1');
      let target2 = document.getElementById('2');
      let target3 = document.getElementById('3');
      let targetAr = [target0, target1, target2, target3];
      [0,1,2,3].map(i => {
        if (targetAr[i].innerHTML == 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      });
      return ret(x);
  };

  var score = function score(x) {
    socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20');
    if (x !== 20) {
    console.log('In score *******<><><><><><><><><><><>********4444444444444444 x and pMscore.x is ', x, pMscore.x );
    pMscore.ret(x).bnd(addTest, pMscore).bnd( v => {
    playerMonad.run([v, pMgoals.x])
    socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + v + ',' + mMgoals.x)});
    }
    else {
      mMplayer.ret([]);
      mM13.ret(0);
      mMgoals.bnd(add, 1, mMgoals).bnd(v => {
        if (v == 3) {
          socket.send('CE#$42,' + pMgroup.x + ',' + pMname.x + ',nothing ')
          mMgoals.ret(0).bnd(mMindex.ret);
          mMhistory.ret([0,0,0,0]);   
          playerMonad.run([0, 0]);
          socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + 0 + ',' + 0)
        }
        else { 
          let g = pMgoals.x*1 + 1;
          playerMonad.run([0, g]);
          socket.send('CG#$42,' + pMgroup.x + ',' + pMname.x + ',' + 0 + ',' + g)
        };
      }) 
    }
 } 

  var reset = function reset () {
      mM3.ret([])
      .bnd(() => mM4.ret(0)
      .bnd(mM8.ret)
      .bnd(cleanup));
      mMgoals2.ret('');
  }

  var newRoll = function(v) {
    socket.send('CA#$42,' + pMgroup.x + ',' + pMname.x + ',6,6,12,20' )
    return ret(v);
  };

  var updateScoreboard = function updateScoreboard(v) {
    mMscoreboard.push(h('div', v))
  };

//**************************************   GAME   *********************************************** GAME END
  // ************************************************************************* iginal Fibonacci enter
  const calcStream$ = merge( chatClickAction$, gameClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$ );

/*
 timeoutAction$, factorsAction$, forwardAction$, backAction$, dummyAction$, primeFib$, fibPressAction$, runTestAction$, quadAction$, testWAction$, testZAction$, testQAction$, edit1Action$, edit2Action$, colorAction$, deleteAction$, newTaskAction$, 
*/ 

  
    return {
      DOM: 
        calcStream$.map(() => 
        h('div.content', [ 
        h('div#rightPanel',  {style: {display: 'none'}}, [

          h('br'),
          h('br'),
          h('br'),
          h('br'),

          h('div#gameDiv',   [
          h('span#sb1'  ),
          h('br'),
          h('span#sb2'  ),
          h('br'),
          h('span#sb5' ),
          h('br'),
          h('span#sb6' ) ]),
          h('br'),
          h('br'),  
          h('br'),  
    
          h('div#chatDiv', [ 
          h('div#messages',  [
          h('span', 'Message: '  ),
          h('input.inputMessage' ),
          h('div', mMmsg.x  ) ]) ]) 
        ]),
        h('div#leftPanel',   [  

        h('div#captionDiv', [
        h('h1', 'Motorcycle.js With JS-monads' ),
        h('span.tao1', ' A shared, persistent todo list, ' ),
        h('br'),
        h('span.tao1', ' A websockets simulated dice game with a traversable history, ' ),
        h('br'),
        h('span.tao1', ' Group chat rooms and more demonstrations of efficient, ' ),
        h('br'),
        h('span.tao2', ' maintainable code using Motorcycle.js and JS-monads.  ' ) ] ),
        h('br'),
        h('span.tao', 'This is a ' ),
        h('a', {props: {href: "https://github.com/motorcyclejs", target: "_blank" }}, 'Motorcycle.js' ),
        h('span', ' application. Motorcycle.js is ' ), 
        h('a', {props: {href: "https://github.com/cyclejs/core", target: "_blank" }}, 'Cycle.js' ),
        h('span', ' using ' ),
        h('a', {props: {href: "https://github.com/cujojs/most", target: "_blank" }}, 'Most' ),
        h('span', ' , ' ),
        h('span', ' and '  ), 
        h('a', {props: {href: "https://github.com/paldepind/snabbdom", target: "_blank" }}, 'Snabbdom' ),
        h('span', ' instead of RxJS and virtual-dom.  The code for this repository is at ' ),
        h('a', {props: {href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" }}, 'JS-monads-stable' ),
        h('div#gameDiv2',  {style: {display: 'none'}}, [
        h('br'),
        h('p.red8', mMgoals2.x ),
        h('span', ' Here are the basic rules:' ), 
        h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '    ),
        h('button#0.num'   ),
        h('button#1.num'   ),
        h('button#2.num'   ),
        h('button#3.num'   ),
        h('br'),
        h('button#4.op', 'add'  ),
        h('button#5.op', 'subtract' ),
        h('button#5.op', 'mult' ),
        h('button#5.op', 'div' ),
        h('button#5.op', 'concat' ),
        h('br'),
        h('div#dice', {style: {display: 'none'}}, [ 
        h('button.roll', 'ROLL' ), 
        h('br'),
        h('button#back', 'BACK' ), 
        h('button#forward', 'FORWARD' ), ]) ]),
        h('div#log1', [
        h('p', 'IN ORDER TO SEE THE GAME, TODOLIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING .'  ),
        h('span', 'Name: ' ),
        h('input#login', {props: {placeholder: "focus on; start typing"}} ) ]),
        h('p', mM6.x ),
        h('div#log2', {style: {display: 'none'}}, [
        h('span', 'Change group: '  ),
        h('input#group' ) ]),
        h('p',  mMsoloAlert.x  ),
        h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers or letters you like. The only check is to make sure someone hasn\t already signed in with whatever you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '  ),
        h('p', ' Data for the traversable game history accumulates until a player scores. The data array is then re-set to [], the empty array. When a player clicks the BACK button, other group members are notified. It is up to the group to decide whether clicking the BACK button disqualifies a player. ' ),
        h('hr' ),
   ] )   ] )     )  }     }     



  var displayf = function displayf(x,a) {
      document.getElementById(a).style.display = 'none';
      return ret(x);
  };

  var displayInline = function displayInline(x,a) {
      if (document.getElementById(a)) document.getElementById(a).style.display = 'inline';
      return ret(x);
  };

  var refresh = function() {
    setTimeout( function () {
       document.location.reload(false);
     },4000);
  };

  const sources = {
    DOM: makeDOMDriver('#main-container'),
    WS: websocketsDriver,
  }

  Cycle.run(main, sources);


