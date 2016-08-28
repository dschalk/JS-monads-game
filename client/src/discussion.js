
        h('h1', 'The Monads'  ),     
        h('h3', ' Monad ' ),
        code.monad,
        h('p', ' Monad instances are useful for chaining computations. Typically, the bnd() method provides its value to a computation that returns an instance of Monad. Here are some examples: ' ),
        code.e1,
        h('p', ' These functions can be used with instances of Monad in many ways, for example: ' ),
        code.e2,
        h('p', ' Each of the functions shown above can be used as a stand-alone function or as an argument to the bnd() method. Each monad in a chain of linked computations can do one of two things with the previous monad\s value: (1) It can ignore it, possibly letting it move past for use further down the chain or (2) use it, with the option of passing it on down the chain. Any computation can be inserted into the chain by giving it an additional first argument (which will be the previous monad\'s value), and having it return an instance of Monad. Say you have a function func(a,b,c) {...}. Put something ahead of a (it will have the previous monad\'s value) and return a monad. You can give the returned monad any value you like. For example, func\'(x,a,b,c) {...; return ret(x)} will work. Its bnd() method will pass along the value x, which is the previous monad\s value. ' ),
        h('h3', ' The Monad Laws ' ),
        h('p', ' In the following discussion, "x == y" signifies that x == y returns true. Let M be the collection of all instances of Monad, let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to monads in M where the return values are the calling instance of Monad. For any m (with id == "m"), v, f, and f\' in M, J, F, and F, respectively, the following relationships hold: ' ), 
        h('pre.lb', `    equals( m.ret(v).bnd(f), f(v) ) Left identity   Holds provided that f returns m.
    Example: equals( m.ret(5).bnd(cube, m).x, cube(5, m) )   
    Haskell monad law: (return x) >>= f ≡ f x  
    
    m.bnd(m.ret) == m   Right identity   Works even with "==" and "==="
    Haskell monad law: m >>= return ≡ m  
    
    equals( m.bnd(f).bnd(f'), m.bnd(v => f(v).bnd(f\')) )  Associativity
    Haskell monad law: (m >>= f) >>= g ≡ m >>= ( \\x -> (f x >>= g) ) ` ),
        h('p', ' where equals is defined as: ' ),
        code.equals,
        h('p', ' The function equals() was used because the == and === operators on objects check for location in memory, not equality of attributes and methods. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different location in memory. That\'s why m.ret(3) == m.ret(3) returns false. If we define equality to mean equality of attributes, then ret is the left and right identity on objects in M and  the objects in M commute when their bind methods operate on functions in F. ' ),
        h('h3', ' The JS-monads-mutableInstances Branch  ' ),
        h('p', ' In the JS-monads-mutableInstances branch of this project, examples of the laws hold when the == operator is used. For example: ' ),
        h('pre', `    m.bnd(add, 3, m).bnd(cube, m) == m.bnd(v => add(v, 3, m).bnd(cube, m)
    m.ret(5).bnd(cube, m) == cube(5, m)   ` ),
        h('p', ' Tests in the JS-monads-mutableInstance produce results closer to what we would expect in mathematics. For example: ' ),
        h('pre', `    m.ret(7) == m.ret(7)  Returns true in JS-monads-mutableIntances.  `),
        h('h3', ' Back to the master branch ' ),
        h('h3', ' fmap ' ),
        h('p', ' I showed you (abpve) some functions designed for instances of Monad, but it is easy to lift functions that return ordinary Javascript values into chains of monadic computations. One way of doing this is to use fmap(), as shown below in finding solutions to the quadratic equation.  ' ),
        h('h3', ' Monad Arithmetic with opM ' ),
        code.opM,
        h('p', ' Since the Monad instance ok had already been created, the second result could have been obtained by running: ' ),
        h('pre', `    ok.ret(m1.x + m2.x)   ` ),
        h('p', ' Just adding the suffix ".x" to an instance of Monad exposes its value. Doing that and running ret() on the return value is all that is needed for performing computations with ordinary functions and wrapping the results in instances of Monad. fmap is non-essential syntactic sugar. This is very different from Haskell, where fmap is an essential component of monadic computation. ' ),  
        h('h3', ' Are They Category Theory Monads?  ' ), 
        h('p#monaditter', ' Just as Javascript if very different from Haskell, so too are the JS-monads very different from Haskell monads. For example, the JS-monads carry bnd() and ret() internally whereas Haskell uses >>= and return. I think the essential takeaways from the above demonstration of similarities are not so much that JS-monads are like Haskell monads, but that (1) the Monad ret() method is the left and right identity on instances of Monad, and (2) instances of Monad compose associatively. Does that mean that members of M (defined above) are monoids in the category of endofunctors, just like Haskell monads? Well, it does sort of feel that way, but it hasn\'t been proven.   ' ), 

// **************************************************************************** END MONAD       START MonadItter   

        h('h2', 'MonadItter' ),
        code.monadIt,
        h('p', ' MonadItter instances do not have monadic properties, but they facilitate the work of monads. Here\'s how they work: ' ),
        h('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p == func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. Here is the definition: ' ), 
        h('p', ' As shown later on this page, MonadItter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. In one of the demonstrations below, they behave much like ES2015 iterators. I prefer them over ES2015 iterators. They also provide promises-like functionality'  ),
        h('h3', ' A Basic Itterator '  ),
        h('p', 'The following example illustrates the use of release() with an argument. It also shows a lambda expressions being provided as an argument for the method mMZ1.bnd() (thereby becoming the value of mMZ1.p) and then mMZ1.release providing an arguments for the function mMZ1.p. The code is shown beneith the following two buttons. ' ),
        h('button#testZ', 'mMZ1.release(1)'  ),
        h('p.code2', mMt3.x ),
        h('span', 'Refresh button: '  ),
        h('button#testQ', 'mMt1.ret(0).bnd(v => mMZ2.release(v)) ' ),
        h('br' ),
        code.testZ,
        h('span.tao', ' mMt3.x sits permanently in the Motorcycle virtual DOM description. You can call ' ), 
        h('span.green', 'mMZ2.release(v)' ),
        h('span', ' by entering a value for v below: ' ),
        h('br' ),
        h('span', 'Please enter an integer here: ' ), 
        h('input#testW' ), 
        h('p', ' cube() is defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) will run several times, each time with v == 1. The result, mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, incrementing the number being cubed each time. ' ),
        h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. ' ),
        h('p#quad4.red2'  ),  
        h('p#quad5.red2' ),
        h('p#quad6.red2'  ),
        h('p' , 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: ' ),
        h('input#quad' ),
        h('p', 'Here is the code:' ),
        code.quad,
        h('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. ' ),  
        h('span' ),
        h('p#monadstate'   ),
// ***************************************************************************************************** START MonadState
        h('h2', 'MonadState and MonadState Transformers' ),  
        h('p', ' An instance of MonadState holds the current state and value of a computation. For any instance of MonadState, say m, these can be accessed through m.s and m.a, respectively.  '   ),  
        code.MonadState,
        h('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with erloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. The following demonstrations use the MonadState instances fibsMonad and primesMonad to create and store arrays of Fibonacci numbers and arrays of prime numbers, respectively. fibsMonad and primesMonad provide a simple way to compute lists of prime Fibonacci numbers.  Because the results of computations are stored in the a and s attributes of MonadState instances, it was easy to make sure that no prime number had to be computed more than once in the prime Fibonacci demonstration. ' ),
        h('p', ' Here is the definition of fibsMonad, along with the definition of the function that becomes fibsMonad.process. ' ),
       code.fibsMonad, 
        h('p', ' The other MonadState instance used in this demonstration is primesMonad. Here is its definition along with the function that becomes primesMonad.process:  ' ),  
        code.primesMonad,
        h('h3', ' MonadState transformers ' ),
        h('p', ' Transformers take instances of MonadState and return different instances of MonadState, possibly in a modified state. The method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad. Here is the definition of fpTransformer: ' ),
        code.fpTransformer,  
        h('p', ' If the largest number in primesMonad.a is less than the square root of the largest number in fibsMonad.a, primesMonad is updated so that the largest number in primesMonad.a is greater than the square root of the largest number in fibsMonad.a. herwise, primesMonad is returned unchanged.  ' ),
        h('p', ' The final computation in the prime Fibonacci numbers demonstration occurs when "tr3(fibsState[3],primesState[3]" is called. tr3() takes an array of Fibonacci numbers and an array of prime numbers and returns an array containing an array of Fibonacci numbers, an array of prime numbers, and an array of prime Fibonacci numbers. Here is the definition of tr3: ' ),
        code.tr3, 
        h('p', ' User input is handled by a chain of computations.  first to update fibsMonad, second to extract fibsMonad.s, third to run fpTransformer to modify and then return primesMonad, and fourth to extract primesMonad.s and run tr3(fibsState[3],primesState[3]). Here is the code: ' ),
        code.primeFibInterface,
        h('p', 'ly 48 Fibonacci numbers need to be generated in order to get the eleventh prime Fibonacci number. But 5546 prime numbers need to be generated to test for divisibility into 2971215073. Finding the next Fibonacci number is just a matter of adding the previous two. Getting the next prime number is a more elaborate and time-consuming procedure. In this context, the time needed to compute 48 Fibonacci numbers is insignificant, so I didn\'t bother to save previously computed Fibonacci numbers in the prime Fibonacci demonstration. When a user enters a number smaller than the current length of fibsMonad.a, fibsMonad is modified such that its length becomes exactly what the user entered.' ), 
        h('p', ' Entering 50 in my desktop Ubuntu Chrome and Firefox browsers got the first eleven prime Fibonacci numbers in about one second. I tried gradually incrementing upwards from 50, but when I got to 61 I stopped due to impatience with the lag time. The 61st Fibonacci number was computed to be 1,548,008,755,920. 76,940 prime numbers were needed to check the 60th Fibonacci number. 96,043 prime numbers were needed to check the 61st Fibonacci number.  At Fibonacci number 61, no new prime Fibonacci numbers had appeared.' ),
        h('p', ' According to multiple sources, these are the first eleven proven prime Fibonacci numbers:' ),
        h('span.lb', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, and 2971215073 ' ),
        h('br' ),
        h('p', ' The number you enter below is the length of the list of Fibonacci numbers you want to generate.  ' ),  
        h('p'  ),  
        h('input#fib92'  ),
        h('br' ),
        h('span#PF_7.red6', 'Fibonacci Numbers' ),  
        h('br' ),
        h('span#PF_9.red7'  ),  
        h('br' ),
        h('span#PF_21.red6', 'Prime Numbers' ),  
        h('br' ),
        h('span#PF_22.red7'  ),  
        h('br' ),
        h('span#PF_8.red6', 'Prime Fibonacci Numbers' ),  
        h('br' ),
        h('span#primeFibs.red7'  ),  
        h('p', ' The next demonstration uses two instances of MonadState to find the prime factors of numbers. Each prime factor is listed once.  my desktop computer, it took several seconds to verify that 514229 is a prime number. After that, due to persistent (until the web page closes) memoization, numbers below 514229 or not too far above it evaluated rapidly. Here\'s where you can enter a number to see its prime factors: ' ),
        h('input#factors_1'  ),
        h('br' ),
        h('span#factors_2.red6'  ),  
        h('br' ),
        h('span#factors_3.red7'  ),  
        h('br' ),
        h('p', ' The demonstration uses primesMonad and factorsMonad. Here are the definitions of factosMonad and factor_state, the function that is factorsMonad.process: ' ),
        code.factorsMonad,
        h('p#async', ' And this is how user input is handled: ' ),
        code.factorsInput,

//************************************************************************** ENDOM MonadState
//************************************************************************** BEGIN Promises
     
        h('h2', ' Asynchronous Composition: Promises, MonadItter, or Neither ' ),
        h('p', ' Using the ES2015 Promises API inside of monads is easy. For example, consider the function "promise", defined as follows: ' ),
        code.promise,
        h('p', ' Running the following code causes m.x == 42 after two seconds. ' ),
        code.promiseSnippet,
        h('p', ' After a two-second delay, the Promise returns an anonymous monad with a value of 27 (anonymous.x == 27). The then statement passes 27 to m and adds 15 to it, resulting in m.x == 42. This pattern can be used to define less trivial functions that handle database calls, functions that don\'t return immediately, etc. And, of course, ES2015 Promises API error handling can be added. ' ),
        h('p', ' The same result can be achieved with MonadItter and the following function ' ),
        code.timeout,
        h('p', ' If you click RUN, "m.x is 27" appears after one second. Two seconds later, "m.x is 42" is displayed along with a blurb. The blurb confirms the chain can continue, without the encumbrance and limitations of "then" clauses, after the delayed computations complete. ' ),
        code.timeoutSnippet,
        h('p', ' '  ),
        h('button#timeout',  ' Run ' ),
        h('span#timeout2'  ), 
        h('span#timeout3'  ), 
        h('p', ' The final blurb confirms that the chained code waits for completion of the asynchronous code. Similar code could be made to wait for database calls, Ajax requests, or long-running processes to return before running subsequent chained code. In fact, messages$, the stream that handles incoming websockets messages, does just that. When a message is sent to the server, messages$ listens for the response. The functions waiting in MonadItter bnd() expressions are released according to the prefix of the incoming message from the server. Essentially, messages$ contains callbacks. MonadItter provides an uncluttered alternative to "if - then" or "case" blocks of code, separating the code to be executed from the listening code.' ), 
        h('p', ' I could have provided for error handling but therehere doesn\'t seem to be any need for it. If I were getting information from a remote database or Ajax server, I would handle errors with "window.addEventListener("error", function (e) { ...".' ),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
//************************************************************************** ENDOM Promises

        h('h2', 'Immutable Data And The State Object " ' ),
        h('h3', ' Mutations   ' ),
       h('p', ' Mutations in this application are confined to MonadItter instances and internal function operations. Functions in this application do not have side effects. If a function argument is an array, say "ar", I make a clone by calling "var ar = ar.slice()" or "let ar2 = ar.slice()" before mutating ar or ar2 inside the function. That way, the original ar remains unaffected. MonadItter instances don\'t have monadic properties. When their bnd() method is called, they sit idly until their release() method is called. I don\t see any reason to make a clone each time bnd() or release() is called. As demonstrated below, a MonadItter instance can hold several different expressions simultaneously, executing them one at a time in the order in which they appear in the code, once each time the release() method is called, In the quadratic equation demonstration, the second call to release() takes the result from the first call  ' ),
       h('h3', ' The simulated dice game ' ),
       h('p', ' A score increases by 1 or 3 if the result of a computation is 20 or 18, respectively. 5 additional points are added each time the result is a multiple of 5. A computation that results in a score of 25 earns 1 goal. So if a score is 17 and a player multiplies 3 * 6, 3 points are awarded resulting in 20 + 5 = 25 points. Goal! When a goal is earned, the traversable history is deleted and prepared for a fresh start. Here is the code involved in the simulated dice game: ' ),
       code.updateCalc,
       h('p', ' The history of the number display and scoreboard in the game can be traversed in either direction until a player scores a goal. After that, the traversable history is deleted and then builds up until another goal is achieves. Players can score points using historical displays, so to keep competition fair, group members are notified when another member clicks the BACK button. The code is shown below, in the MonadSet section; but first, here is some background. '  ),



       h('h3', ' playerMonad ' ), 
       h('p', ' playerMonad and its process attribute are defined as follows: ' ),
       code.playerMonad,
       h('p#monadset', ' As you see, playerMonad.run does one simple thing; it updates the four monads in the player_state function. There are various ways of achieving the same result, but MonadState provides a convenient alternative. Next, I will show how the list of currently online group members is maintained through the use of an instance of MonadSet. ' ),
       h('h2', ' MonadSet ' ),
       h('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, a message prefixed by NN#$42 prompts the server to send out the current list of group members. When someone closes their browser window, the server is programmed to send out the new list of group members. All updating is done in the websockets messages function. MonadSet\'s add and delete methods provide convenient alternatives to using Monad\'s bnd method with the push and splice functions. Here are the definitions of MonadSet and the MonadSet instance sMplayers ' ),
       code.MonadSet,
       h('p', ' Because sMplayerss is immutable, its most recent state can be safely stored in the mMsetArchive instance of Monad. This is done so the traversable game history shows who was online in each step. Here is the code that keeps the browser window current and, at the same time, maintains a history of the sate of game play. ' ),
       code.traverse,
       h('p', ' You must log in and enter something in the "Change group" box in order to see currently online members. You can open this page in more windows and see how promptly additions and exits show up in the scoreboard. ' ),
 


        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('h2', 'Updating the DOM'  ),
        h('p', ' Two general methods work in Motorcycle. Sometimes I keep m.x in the virtual DOM code for some monad m. If a user performs some action that cause m.x to have a new value, the actual DOM changes accordingly. her times I use document.getElementById("someId").innerHTML = newValue.' ),
        h('br' ),
        h('h3', 'Dice Game DOM updates' ),
        h('p', ' mMcurrentRoll.ret() is called only when (1) a new dice roll comes in from the server, (2) when a player clicks a number, and (3) when clicking a number or operator results in a computation being performed. These are the three things that require a DOM update. When a player clicks a number, it disappears from number display. When a computation is performed, the result is added to the number display, unless the result is 18 or 20. A result of 18 or 20 results in a new roll coming in from the server ' ),
        h('p', ' I like the way Cycle.js and Motorcycle.js are unopinionated. DOM updates can be accomplished by permanently placing a mutating list of strings in the virtual DOM description, or by calling element.innerHTML = newValue. Either way, the actual DOM gets mutated immediately, and mutating the DOM is what interactive applications are all about. Well, unless you load fresh pages every time something changes. I guess some people are still doing that.  ' ),
        h('hr' ),  
        h('h2', 'Concise Code Blocks For Information Control' ),
        h('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '  ),
        h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   ' ),
        code.messages,
        h('p', ' The "mMZ" prefix designates instances of MonadItter. The bnd() method assigns its argument to the "p" attribute. "p" runs if and when the release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. The release method in next() has no argument, but next does take arguments, as illustrated below.' ),
        h('span.tao', ' The incoming messages block is just a syntactic variation of a switch block, but that isn\'t all that MonadItter instances can do. They can provide fine-grained control over the lazy evaluation of blocks of code. Calling release() after a function completes some task provides Promise-like behavior. Error handling is optional. The MonadItter release(...args) method facilitates sequential evaluation of code blocks, reminiscent of video and blog explanations of ES6 iterators and generators. I prefer doing it with MonadItter over "yield" and "next". For one thing, ES6 generator "yield" blocks must be evaluated in a predetermined order. This link takes you back to the MonadItter section with interactive examples of the use of release() with arguments.  ' ),
        h('a#tdList2', {props: {href: '#iterLink'}}, 'release() with arguments'   ),  
        h('br' ),
        h('br' ),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('br' ),
        h('h3', 'The Todo List' ),
        h('p', ' Next, I\'ll go over some features of the todo list application. This will show how Motorcycle.js and the monads work together.' ),
        h('p', 'Creation  A Task: If you enter something like Susan, Fred, Pay the water bill, the editable task will appear in your browser and in the browsers of any members a group you might have created or joined. If you have loaded this page in another tab and changed to the same group in both, you will see the task in both tabs, barring some malfunction. The task has a delete button, an edit button, and a "Completed" checkbox. It shows that Susan authorized the task and Fred is responsible for making sure it gets done. Instead of entering an authority and responsible person, you can just enter two commas before the task description. Without two commas, a message appears requesting more information. ' ),
        code.newTask,
        h('p', 'mM$taskList caries a string representing the task list. mMtaskList.x.split(",") produces an array whose length is a multiple of six. Commas in the task description are replaced by "$*$*$" so split(",") will put the entire task description in a single element. Commas are re-inserted when the list arrives from the server for rendering. Although a task list is a nested virtual DOM object (Snabbdom vnode), it can be conveniently passed back and forth to the server as a string without resorting to JS.stringify. Its type is Text on the server and String in the front end, becoming a virtual DOM node only once, when it arrives from the server prefixed by "DD#$42" causing "process(e.data) to execute. Here is process(): ' ),
        code.process,
        h('span.tao', 'As you see, the string becomes a list of six-element objects, then those objects are used to create a Snabbdom vnode which is handed to mM$taskList.ret() leading to the update of mMtaskList. mMtaskList.x sits permanently in the main virtual DOM description. '  ),
        h('a', {props: {href: "https://github.com/dschalk/JS-monads-stable"}}, 'https://github.com/dschalk/JS-monads-stable' ),
        h('br'),
        h('p', ' Clicking "Completed": When the "Completed" button is clicked, the following code runs:         '  ),
        code.colorClick,
        h('p', 'mMtaskList is split into an array. Every sixth element is the start of a new task. colorAction$ toggles the second, third, and fourth element in the task pinpointed by "index" * 6. getIndex finds the index of the first and only the element whose task description matches the one that is being marked "Completed". I say "only" because users are prevented from adding duplicate tasks. After the changes are made, the array of strings is reduced to one string and sent to the server by task2(). '  ),  
        
        h('p', ' This is the code involved in editing a task description: '  ),
        code.edit,
        h('p', 'Clicking "Edit" causes a text box to be displayed. Pressing <ENTER> causes it to disappear. edit2Action$ obtains the edited description of the task and the index of the task item and provides them as arguments to process. Process exchanges $*$*$ for any commas in the edited version and assigns the amended task description to the variable "task". mMtaskList.x is copied and split into an array. "index * 6" is replaced with "task" and the list of strings is reduced back to a single string and sent to the server for distribution. This pattern, - (1) split the string representation of the todo list into an array of strings, (2) do something, (3) reduce the list of strings back to a single string - is repeated when the "Delete" button is clicked. If the last item gets deleted, the server is instructed to delete the persistent file bearing the name of the group whose member deleted the last task. ' ), 
        h('p#common', 'Cycle.js has been criticized for not keeping state in a single location, the way React.js does. Motorcycle.js didn\'t do it for me, or try to force me to do it, but it so happens that the current state of all active monads is in the object ". I have written applications in Node.js and React.js, and I can say without a doubt that Motorcycle.js provides the best reactive interface for my purposes.  ' ),
        h('hr'),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('h2', 'Common Patterns' ),
        h('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. ten, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '  ),
        h('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2.ret() causing m2 to have m1\'s value. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2")). These relationships are demonstrated in the following tests: ' ),
        code.examples,
        h('p'  ), 
        h('p', ' Here are two basic ways to create a monad named "m" with id = "m" and value v: '  ),
        code.examples2,
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('hr'),
        h('hr' ),  
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('p'  ),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('span#dummy2.red3' ),  
        h('hr'),  
        h('button#dummy', mMdummy.x ),  
        h('p' ),  
        h('p' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p', '.' ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' )  
        ])
      ])
    )}}   
