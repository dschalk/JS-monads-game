
  var task2 = function task2 (str) { 
    console.log('In taskAction$. str is: ', str)
    socket.send('TD#$42' + ',' + pMgroup.x + ',' + pMname.x + ',' + '@' + str);
  };

  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown');

  const newTaskAction$ = newTask$.map(e => {
      let ob = {};
      var alert = '';
      var task = '';
      if( e.keyCode == 13 ) {
        var ar = e.target.value.split(',');
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }
        var ar2 = ar.slice(2);
        console.log('*************  newTaskAction$  ************************$$$$$$$$$$$  ar ', ar);
        if (ar2.length == 1) {
          task = ar[2];
        }
        if (ar2.length > 1) {
          task = ar2.reduce((a,b) => a + '$*$*$' + b);
        }
        if ( (mMar2.x.filter(v => (v.task == task)).length) > 0 ) {
          document.getElementById('alert').innerHTML = task + " is already listed.";
        }
        else if ( ar.length > 2 ) {
          mMcurrentList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mMtemp)
          .bnd(v => task2(v));
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        } 
      } 
  });

  const process = function(str) {
    var a = str.split(",");
    if (a == undefined) {
      return;
    };
    if (a.length < 9) {
      return
    };
    var ob = {};
    var ar = a.slice(3)
    var s = ar.reduce((a,b) => a + ',' + b);
    // console.log('In process. ar and s are: ', ar, s);
    var tempArray = [];
    if (ar.length < 6) {return};
    if ((ar.length % 6) !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    } 
    mMcurrentList.ret(s);
    process3(ar);
  }
    
  const process3 = function(a) {
    if (a.length > 0 && (a.length % 6) == 0) {
    var ar5 = [];
    var keys = Array(a.length/6).fill(1);
    keys.map(_ => {
      ar5.push(
        {
          task: convertBack(a.shift()),
          color: a.shift(),
          textDecoration: a.shift(),
          checked: a.shift() === 'true',
          author: a.shift(),
          responsible: a.shift()
        }
      )
   })
    mMar2.ret(ar5);
    process4(ar5);
    }
    else {
      alert = 'The length of the game array is either 0 or is not divisible by 6';
      document.getElementById('alert2').innerHTML = alert;
    }
  };

  const process4 = function(a) {
    var tempArray = [];
    let keys = Object.keys(a);
    for (let k in keys) {
      tempArray.push(
        h('div.todo',  [
          h('span.task3', {style: {color: a[k].color, textDecoration: a[k].textDecoration}},
              'Task: ' + a[k].task  ),  
          h('br'),
          h('button#edit1', 'Edit'  ),
          h('input#edit2', {props: {type: 'textarea', value: a[k].task}, style: {display: 'none'}}  ), 
          h('span#author.tao', 'Author: ' + a[k].author  + ' / ' + 'Responsibility: ' + a[k].responsible),
          h('br'),
          h('input#cb', {props: {type: 'checkbox', checked: a[k].checked}, style: {color: a[k].color,
               textDecoration: a[k].textDecoration} } ), 
          h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
          h('button.delete', 'Delete'  ),  
          h('br'),
          h('hr')])
      )
    }
    mMtaskList.ret(tempArray)
  }

  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    let s = mMcurrentList.x;
    let ar = s.split(',');
    let n = 6 * index + 3;
    let j = 6 * index + 2;
    let k = 6 * index + 1;
    let checked = ar[n];
    if (checked == 'true')  {
      ar[n] = 'false'; 
      ar[k] = 'yellow'; 
      ar[j] = 'none'; 
    }
    else {
      ar[n] = 'true'; 
      ar[k] = 'lightGreen'; 
      ar[j] = 'line-through'; 
    }
    task2( ar.reduce((a,b) => a + ',' + b) )
  });

  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')
    
  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    if( e.keyCode == 13 ) {
      process2(v, index);
    mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  const process2 = function(str, index) {
    var a = mMcurrentList.x.split(',');
    a[6*index] = str;
    var b = a.reduce((a,b) => a + ',' + b)
    task2(b);  
  };

  const deleteClick$ = sources.DOM
    .select('.delete').events('click')
    
  const deleteAction$ = deleteClick$.map(e => {
    let index = getIndex(e);
    let s = mMcurrentList.x;
    let ar = s.split(',');
    let str = '';
    ar.splice(index*6, 6);
    if (ar.length > 0) {
      task2(ar.reduce((a,b) => a + ',' + b));
    } else {
      socket.send('TX#$42' + ',' + pMgroup.x + ',' + pMname.x ); 
      mMtaskList.ret('');
    } 
  });

  const timeoutClicks$ = sources.DOM.select('#timeout').events('click')

  const timeoutAction$ = timeoutClicks$.map(() => {
    document.getElementById('timeout2').innerHTML = ''
    document.getElementById('timeout3').innerHTML = ''
    m.ret(3, 'm')
      .bnd(timeout2, 1, m, [() => m
      .bnd(cube, m)
      .bnd(display, 'timeout2', 'm.x is ' + ' ' + m.x, m)
      .bnd(timeout2, 2, m, [() => m
      .bnd(add, 15, m)
      .bnd(display, 'timeout2',  'm.x is ' + ' ' + m.x, m)
      /* Continue chaining from here */
      .bnd(display, 'timeout3', 'The meaning of everything was computed to be' + ' ' + m.x, m)   
    ])]);  
  });  

  const todoClick$ = sources.DOM
    .select('#todoButton').events('click')
    
  const todoClickAction$ = todoClick$.map(e => {
    var el = document.getElementById('todoDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
});

  const runTest$ = sources.DOM
    .select('#runTest').events('click')
    
  const runTestAction$ = runTest$.map(() => {
    runTest();
});

