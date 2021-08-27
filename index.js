/*
We have a list of various types of tasks to perform. Task types are identified by number:
task type 1, task type 2, task type 3, etc. Each task takes 1 time slot to execute,
and requires a cooldown to recover before we can execute another task of the same type.
However, we can execute tasks of other types in the meantime.  The recovery interval is
the same for all task types.

Given a list of input tasks to run, and the cooldown interval, output the number of time
slots required to run them in the given order of the tasks.

tasks = [1, 1, 2, 1]
cooldown = 2
Output: 7  (order is 1 _ _ 1 _ 2 1)
*/

function processTasks(tasks, cooldown) {
	let output = 0

	let vis = ''

	let cooldown_dif = cooldown
	let recent_task = 0

	for (const task of tasks) {
		// add a task
		output++
		vis += task

		// calculate wait
		if (recent_task === task) {
			cooldown_dif = 0
		} else if (cooldown_dif < cooldown) {
			cooldown_dif++
		}

		// keep for next round
		recent_task = task

		// add cooldown time
		let diff = Math.abs(cooldown_dif - cooldown)
		output += diff
	}

	console.log(output, vis)

}

function calcCoolDown(cd, cooldown) {
	if (cd >= cooldown) {
		return 0
	} else {
		return cd + 1
	}
}

function findMost(task_obj) {
	const arr = Object.entries(task_obj)
	arr.sort((a, b) => a[1] + b[1])
	return arr
}


/**
 * Validates a Sudoku game.
 * Input: 2D array of integers.
 * Return:
 * - true if the input satisfies all the requirements
 * - false otherwise
 *
 * Requirements:
 * - Each row has all values 1-9 exactly once
 * - Same per column
 * - Same for each 3x3 square
 */


function validateSudoku(matrix) {

	function validate(number, obj) {
		if (number > 0 && number < 10 && !obj[number]) {
			obj[number] = true
			return true
		}
		return false
	}


	// validate rows
	for (const row of matrix) {
		let obj = {}
		for (const item of row) {
			if (!validate(item, obj)) {
				console.log('invalid row', item, obj)
				return false
			}
		}
	}


	// validate columns
	for (let r = 0; r < matrix.length; r++) {
		let obj = {}
		for (let c = 0; c < matrix.length; c++) {
			let col_item = matrix[c][r]
			if (!validate(col_item, obj)) {
				console.log('invalid col', col_item, obj)
				console.log('cords:', r, c, matrix)
				return false
			}
		}
	}


	// validate 3x3 squars
	let r = 0
	while (r < matrix.length) {
		let obj = {}
		let c = 1 * r
		let _c = c
		let r_of_c = r
		const arr = []
		while (c < _c + 9) {
			console.log('LLL', (r_of_c % 3) + Math.floor(r / 3))
			let box_item = matrix[r_of_c % (3 + Math.floor(r / 3))][c]
			// console.log(box_item)


			// if (!validate(box_item, obj)) {
			//     console.log('invalid box', box_item, obj)
			//     console.log('cords:', r, c, matrix)
			//     return false
			// }


			arr.push(box_item)

			r_of_c++

			c = Math.floor(r_of_c / 3)



		}

		console.log(arr)



		console.log('-----')
		r += 1
	}
	return true

}


var invalidCol = [
	[8, 3, 5, 4, 1, 6, 9, 2, 7],
	[2, 9, 6, 8, 5, 7, 4, 3, 1],
	[4, 1, 7, 2, 9, 3, 6, 5, 8],
	[5, 1, 9, 1, 3, 4, 7, 8, 2], // (1,3)
	[1, 2, 3, 6, 7, 8, 5, 4, 9],
	[7, 4, 8, 5, 2, 9, 1, 6, 3],
	[6, 5, 2, 7, 8, 1, 3, 9, 4],
	[9, 8, 1, 3, 4, 5, 2, 7, 6],
	[3, 7, 4, 9, 6, 2, 8, 1, 5]
];



var valid = [
	[8, 3, 5, 4, 1, 6, 9, 2, 7],
	[2, 9, 6, 8, 5, 7, 4, 3, 1],
	[4, 1, 7, 2, 9, 3, 6, 5, 8],
	[5, 6, 9, 1, 3, 4, 7, 8, 2],
	[1, 2, 3, 6, 7, 8, 5, 4, 9],
	[7, 4, 8, 5, 2, 9, 1, 6, 3],
	[6, 5, 2, 7, 8, 1, 3, 9, 4],
	[9, 8, 1, 3, 4, 5, 2, 7, 6],
	[3, 7, 4, 9, 6, 2, 8, 1, 5]
];

var invalidRow = [
	[8, 3, 5, 4, 1, 6, 9, 2, 7],
	[2, 9, 6, 8, 5, 7, 4, 8, 1], // (7,1)
	[4, 1, 7, 2, 9, 3, 6, 5, 8],
	[5, 6, 9, 1, 3, 4, 7, 8, 2],
	[1, 2, 3, 6, 7, 8, 5, 4, 9],
	[7, 4, 8, 5, 2, 9, 1, 6, 3],
	[6, 5, 2, 7, 8, 1, 3, 9, 4],
	[9, 8, 1, 3, 4, 5, 2, 7, 6],
	[3, 7, 4, 9, 6, 2, 8, 1, 5]
];


var invalidSquare = [
	[8, 3, 5, 4, 1, 6, 9, 2, 7],
	[2, 9, 6, 8, 5, 7, 4, 3, 1],
	[4, 1, 7, 2, 9, 3, 6, 5, 8],
	[5, 6, 9, 1, 3, 4, 7, 8, 2],
	[9, 2, 3, 6, 7, 8, 5, 4, 1], // (0,4)
	[7, 4, 8, 5, 2, 9, 1, 6, 3],
	[6, 5, 2, 7, 8, 1, 3, 9, 4],
	[9, 8, 1, 3, 4, 5, 2, 7, 6],
	[3, 7, 4, 9, 6, 2, 8, 1, 5]
];

var invalidValue = [
	[8, 3, 5, 4, 1, 6, 9, 2, 7],
	[2, 9, 6, 8, 5, 7, 4, 3, 1],
	[4, 1, 7, 2, 9, 3, 6, 5, 8],
	[5, 6, 9, 1, 3, 4, 7, 8, 2],
	[1, 2, 3, 6, 7, 8, 5, 4, 9],
	[7, 4, 8, 5, 2, 9, 1, 6, 3],
	[6, 5, 2, 7, 8, 1, 3, 9, 4],
	[9, 8, 1, 3, 4, 5, 2, 7, 0], // (8,7)
	[3, 7, 4, 9, 6, 2, 8, 1, 5]
];

// console.table([
//     // validateSudoku(valid), // true
//     // validateSudoku(invalidRow), // false
//     // validateSudoku(invalidCol), // false
//     validateSudoku(invalidSquare), // false
//     // validateSudoku(invalidValue), // false

// ])



function boolAnagram(a, b) {
	if (a.length === b.length) {
		// count the letters for each
		a = getLetterCount(a)
		b = getLetterCount(b)
		for (const key in a) {
			if (a[key] !== b[key]) {
				return false
			}
		}
		return true
	}
	return false
}


function getLetterCount(word) {
	const obj = {}
	for (const letter of word) {
		if (obj[letter]) {
			obj[letter]++
		} else { obj[letter] = 1 }
	}
	return obj
}

// console.log(boolAnagram('gggc', 'cccg'))



// flatten an array
// input: [1, {a: [2, [3]]}, 4, [5, [6]], [[7], 8, 9], 10];
// output: [1, {a: [2, [3]]}, 4, 5, 6, 7, 8, 9, 10];


function flattenArray(arr) {
	const flt = []
	function f(arr, i = 0) {
		if ((arr[i] instanceof Array)) {
			// go into the array
			f(arr[i])
		} else {
			flt.push(arr[i])
		}

		if (arr[i + 1] !== undefined) {
			f(arr, i + 1)
		}

	}
	f(arr)
	return flt
}



// recoursavly travers an array
const array = []
function travle(arr, i = 0) {
	if (arr[i + 1]) {
		array.push(travle(arr, i + 1))
	}
	console.log(arr[i])
	return arr[i]
}

// travle([1, 2, 3, 4, 5, 6, [12, 12, 12]])

// console.log(flattenArray([1, { a: [2, [3]] }, 4, [5, [6]], [[7], 8, 9], 10]))


/*
LA Metro/Koreatown

LA Metro has GPS trackers in all of their vehicles that live-report back.
They also offer a JSON API that allows for query that live reporting for
vehicles locations.

The API is available at: http://api.metro.net/agencies/lametro/vehicles/

It just so happens that Koreatown is a rectangle. In (latitude, longitude)
format, Koreatown's borders are:
* northwest corner of (34.068987, -118.3113447)
* southeast corner of (34.052648, -118.291619)

---

Make a function that returns all vehicle IDs currently in LA's Koreatown.

console.log(get_koreatown_vehicles())
['9412', '5901', ...]

The goal here to provide a readable proof-of-concept-grade solution.

---

var request = require("request");
request("http://api.metro.net/agencies/lametro/vehicles/", function(error, resonse, body) {
  console.log(JSON.parse(body)['items'][0]);
})

> { route_id: 788, latitude: 34.209808, heading: 179.0, id: '8084', predictable: True,
	run_id: '788_6_1', longitude: -118.448929, seconds_since_report: 222
}
*/

async function getData() {
	const request = await fetch('http://api.metro.net/agencies/lametro/vehicles/')
	const json = await request.json()
	return json.items
}

async function getKoreaTownVehicles() {
	const data = await getData()
	const arr = []
	for (const vehicle of data) {
		if (
			vehicle.latitude <= 34.068987
			&& vehicle.latitude >= 34.052648
			&& vehicle.longitude <= -118.291619
			&& vehicle.longitude >= -118.3113447
		) {
			// we have a vehicle in korea town!
			arr.push(vehicle.id)
		}
	}
	return arr
}

console.log(getKoreaTownVehicles())


/*
Objective:
 Create a program that will allow a user to enter a word in English and receive the translation
 of that word according to the Android source.
 Breakdown:
  - Define data format from parsed XML files
  - Define function for translating a word
  - Define function for getting user input/returning translation

 Notes:
  - For simplicty, user must enter an exact match to get a result.
  E.g. if they want the translation for 'Create', they must enter 'Create', 'Created' will not match.

Resources:
  Translation file:
  https://android.googlesource.com/platform/packages/apps/Settings/+/master/res/values-es-rUS/strings.xml
   - Saved locally as 'es.xml'

  English file:
  https://android.googlesource.com/platform/packages/apps/Settings/+/master/res/values/strings.xml
   - Saved locally as 'en.xml'
*/

/**
 * Takes a file name as input and returns the data in a workable format.
 *  Since XML parsing is beyond the scope of this question,
 * lets assume it's a magical function that you get to decide the output of.
 * @param  {string} inputFile   Name of the file to be parsed
 * @return {?}               A tree where each node repreasets an entriy in xml,
 */

function parseXML(file) {

}

// find fibbonacci
function fibo(n) {
	let t = 0
	let last = 1
	let lastlast = 0
	if (n <= 1) {
		return n
	}

	for (let i = 1; i < n; i++) {
		t = last + lastlast
		lastlast = last
		last = t

	}
	return t
}
const n = 2
// console.log('-->', fibo(n))

function getNthFibo(n) {
	if (n <= 1) {
		return n;
	} else {
		return getNthFibo(n - 2) + getNthFibo(n - 1);
	}
}

// console.log(':)', getNthFibo(n))

function fillInTheBlanks(arr) {
	let holder = null
	return arr.map(item => {
		if (item !== null) {
			holder = item
		} else {
			item = holder
		}
		return item
	})
}

// console.log(fillInTheBlanks([1, 2, null, null, null]))

function misMatched(a, b) {
	// convert str to arr
	const arr_a = new Set(a.split(' '))
	const arr_b = new Set(b.split(' '))

	// us a dictionary to compare
	const obj = {}
	for (const word of arr_a) {
		if (obj[word] === undefined) {
			obj[word] = 1 // we found a word that does not exist, so put it in
		}
	}

	for (const word of arr_b) {
		if (obj[word] === undefined) {
			obj[word] = 1 // we found a word that does not exist, so put it in
		} else if (obj[word] === 1) {
			obj[word] = 2
		}
	}

	const output = []

	for (const key in obj) {
		const value = obj[key]
		if (value === 1) {
			output.push(key)
		}
	}

	return output

}

// console.log(misMatched(
//     'Firstly this is the first string',
//     'Next next next next is the second string'
// ))

/**
 Question 4:
	Complete a function that returns the smallest key
	(sorted in ascending order alphabetically) of the given input
	dictionary containing nth highest value

 For example:
	- dictionary : {"a":1, "b": 2, "c": 100, "d": 30}
	- n : 2 (2nd highest value)
	- output : "d"
 */

function getKeyByRank(obj, n) {
	const values_obj = {}
	for (const key in obj) {
		const value = obj[key]
		if (values_obj[value] !== undefined) {
			values_obj[value].push(key)
		} else {
			values_obj[value] = [key]
		}
	}

	const arr = Object.keys(values_obj).sort((a, b) => parseInt(b) - parseInt(a))
	return values_obj[arr[n - 1]]
}

// console.log(getKeyByRank({ "a": 1, "b": 2, "c": 100, "d": 30, "e": 30, }, 2))

function indexOf(haystack, needle) {
	// break up the haystack into needle.length size parts
	const parts = []
	for (let i = 0; i < haystack.length - (needle.length - 1); i++) {
		let str = ''
		for (let j = 0; j < needle.length; j++) {
			str += haystack[i + j]
		}
		parts.push(str)
	}

	for (let i = 0; i < parts.length; i++) {
		// sort the needle and the haystack
		let ana = parts[i].split('').sort().join('')
		let gram = needle.split('').sort().join('')
		if (ana === gram) {
			return i
		}
	}
}

// console.log(
//     indexOf("actor", "rot")
// )

// https://app.coderpad.io/dashboard/questions#39543 <---- do this one next


/**
There are n people standing in a queue, and they numbered from 0 to n - 1 in left to right order.
You are given an array heights of distinct integers where heights[i] represents the height of
the ith person.

A person can see another person to their right in the queue if everybody
in between is shorter than both of them. More formally, the ith
person can see the jth person if i < j and min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ...,
heights[j-1]).

Return an array answer of length n where answer[i] is the number of people the ith person can
see to their right in the queue.
*/

function peopleInLine(line) {
	const output = []
	for (let i = 0; i < line.length; i++) {
		const minion = line[i]
		let people_seen = 0
		let last_height = 0
		for (let k = i + 1; k < line.length; k++) {
			let other_person = line[k]
			if (other_person >= minion) {
				// we cannot see anymore
				people_seen++
				break
			} else if (other_person < last_height) {
				// did not see them
				continue
			} else if (other_person < minion) {
				people_seen++
				last_height = other_person
			}
		}
		output.push(people_seen)
	}
	return output
}

function peopleInLineBetter(line) {
	const output = []
	const cache = {}
	let people_seen = 0
	let last_height = 0
	for (let i = 0; i < line.length; i++) {
		const minion = line[0]
		let other_person = line[i]

		if (other_person > minion) {
			// we cannot see anymore
			people_seen++
			break
		} else if (other_person < last_height) {
			// console.log('not seen')
			// did not see them
			continue
		} else if (other_person < minion) {
			people_seen++
			last_height = other_person
		}




	}
	output.push(people_seen)
	return output
}


// console.log(peopleInLine(
//     [5, 1, 2, 3, 10]
// ))
// console.log(peopleInLineBetter(
//     [5, 1, 2, 3, 10]
// ))

/*
	Given an array of integers nums and an integer k, return the
	total number of continuous subarrays whose sum equals to k.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraySum = function (nums, k) {
	let count = 0
	let sum = 0
	let cache = { 0: 1 }
	for (let i = 0; i < nums.length; i++) {
		let value = nums[i]
		sum += value
		if (cache[sum - k]) {
			count += cache[sum - k]
		}
		if (cache[sum]) {
			cache[sum] += 1
		} else { cache[sum] = 1 }
	}
	return count
};

// console.log(subarraySum([1, -1, 0], 0))

/*
Given a string s which represents an expression,
evaluate this expression and return its value.

The integer division should truncate toward zero.

You may assume that the given expression is always valid.
All intermediate results will be in the range of [-231, 231 - 1].

Note: You are not allowed to use any built-in function which evaluates
strings as mathematical expressions, such as eval().


Input: s = "3+3+3+2*2+1+2"
Output: 7

Input: s = " 3/2 "
Output: 1

Input: s = " 3+5 / 2 "
Output: 5
*/

/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
	const arr = s.split('+')
	let answer = 0
	for (const item of arr) {
		if (isNaN(item)) {
			// handle multiplication
			answer += item.split('*').reduce((a, b) => parseInt(a) * parseInt(b))
		} else {
			answer += parseInt(item)
		}
	}

	return answer
};


// console.log(calculate("2*2*2+1"))

/*
Given an int array wood representing the length of n pieces of wood and an int k.
It is required to cut these pieces of wood such that more or equal to k pieces of the
same length len are cut. What is the longest len you can get?
*/

function cutWood(arr, k) {
	function isValid(cut_len, arr, k) {
		let count = 0
		for (const wood of arr) {
			count += Math.floor(wood / cut_len)
		}
		return count >= k
	}

	let right = Math.max(...arr)
	let left = 1
	let mid
	let result = 0

	while (left < right) {
		mid = Math.floor((left + right) / 2)
		if (isValid(mid, arr, k)) {
			// we cut a length that may work
			result = mid
			left = mid + 1
		} else {
			// we cut to high
			right = mid
		}
	}

	return result
}

// what is the longest length we can cut ans still result in k or more pieces?
function cutWoodEli(arr, k) {
	// look at the middle
	let smallest = 1
	let largest = Math.max(...arr)
	let result = 0 // we did not make any cuts yet
	let cut_len // we will use a binary approch of finding the middle until we know we
	// have our biggest posible cut
	while (smallest < largest) {
		cut_len = Math.floor((smallest + largest) / 2) // this is our cut length,
		// notice its the middle of our two extreams

		// check this cut lenght against the peices of wood to see if its valid
		let count = 0
		for (const wood of arr) {
			count += Math.floor(wood / cut_len) // ensure we get whole pieces
		}

		if (count >= k) {
			// this is a valid cut, lets move up the line to see if we can make it better
			result = cut_len
			smallest = cut_len + 1
		} else {
			// this cut was too big, lets go down by half
			largest = cut_len
		}
	}
	return result
}

// let cutWood_arr = [5, 9, 7], cutWood_k = 3
// console.log(cutWood(cutWood_arr, cutWood_k))
// console.log(cutWoodEli(cutWood_arr, cutWood_k))

// Kadane's Algorithm
function kadaneAlgorithm(prices) {
	let total = 0;
	let local = 0;
	for (let i = 0; i < prices.length - 1; i++) {
		local = Math.max(0, local + prices[i + 1] - prices[i])
		total = Math.max(total, local)
	}
	return total
}

function buyStocks(prices) {
	let result = 0
	let bought = prices[0] // we look at the first one
	for (const stock of prices) {
		let temp = stock - bought
		if (temp > result) {
			// we found a price for what we have now
			result = temp
		} if (stock < bought) {
			// we found a good trade for the future
			bought = stock
		}
	}
	return result
}


/*
Given an array of integers nums and an integer target, return
indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution,
and you may not use the same element twice.

You can return the answer in any order.
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	for (let i = 0; i < nums.length; i++) {
		for (let k = i + 1; k < nums.length; k++) {
			if (nums[i] + nums[k] === target) {
				return [i, k]
			}
		}
	}
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
	const obj = {}
	for (const num of nums) {
		if (obj[num]) {
			return true
		} else {
			obj[num] = true
		}
	}
	return false
};

/**
 * Given an integer array nums and two integers k and t,
 * return true if there are two distinct indices i and j in the
 * array such that abs(nums[i] - nums[j]) <= t and abs(i - j) <= k.
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k) {
				return true
			}
		}
	}
	return false
};


/*
Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

class Node {
	public int val;
	public List<Node> neighbors;
}
*/

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
	const visited_nodes = { [node.val]: new Node(node.val) }
	const q = []
	q.push(node)
	while (q.length !== 0) {
		const current_node = q.shift()
		const clone_current_node = visited_nodes[current_node.val]
		if (current_node.neighbors.length !== 0) {
			let v = current_node.neighbors
			for (const n_node of v) {
				const n_clone_node = visited_nodes[n_node.val]
				if (!n_clone_node) {
					q.push(n_node)
					visited_nodes[n_node.val] = new Node(n_node.val)
				}
				clone_current_node.neighbors.push(visited_nodes[n_node.val])
			}
		}
	}
	return visited_nodes[node.val]
};


function ReverseLinkedList(ll) {
	const r_ll = new LL()
	function r(node) {
		if (node.next) {
			r(node.next)
		}
		r_ll.add(node)
	}
	r(ll.head)
	return r_ll
}

function ReverseLinkedList(ll) {
	const r_ll = new LL()
	function r(node) {
		if (node.next) {
			r(node.next)
		}
		r_ll.add(node)
	}
	r(ll.head)
	return r_ll
}

function reverseDLL(dll) {
	const mid_point = Math.floor(dll.size / 2)
	let head = dll.head
	let tail = dll.tail
	for (let i = 0; i < mid_point; i++) {
		// perfrom the swap
		const holder_next = head.next
		const holder_prev = head.prev

		head.next = tail.next
		head.prev = tail.prev

		tail.next = holder_next
		tail.prev = holder_prev

		// move to the next two
		head = tail.next
		tail = head.next
	}
	return dll
}

function useRecursionToReverseString(str) {
	let rev_str = ''
	function r(n) {
		if (n < str.length) {
			r(n + 1)
			rev_str += str[n]
		}
	}
	r(0)
	return rev_str
}

// console.log('-->', useRecursionToReverseString('hello'));

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
	const rows_visited = {}
	const cols_visited = {}

	// copy original matrix
	const og = matrix.map(x => [...x])

	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[0].length; col++) {
			let item = og[row][col] // look at the martix that is not mutating
			if (item === 0) {
				// make the row all zeros and colums all zeors
				if (!rows_visited[row]) {
					for (let k = 0; k < matrix[row].length; k++) {
						matrix[row][k] = 0
					}
					rows_visited[row] = true
				}

				if (!cols_visited[col]) {
					for (let k = 0; k < matrix.length; k++) {
						matrix[k][col] = 0
					}
					cols_visited[col] = true
				}
			}
		}
	}
	return matrix
};

// console.log(setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]]))


function testVars() {
	a = 'z'
	console.log(a, b, c)
	var a = 'a', b = 1, c = null
}


// graph algorithims
class Graph {
	constructor() {
		this.adjacencyList = {};
	}
	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) {
			this.adjacencyList[vertex] = [];
		}
	}
	addEdge(source, destination) {
		if (!this.adjacencyList[source]) {
			this.addVertex(source);
		}
		if (!this.adjacencyList[destination]) {
			this.addVertex(destination);
		}
		this.adjacencyList[source].push(destination);
		this.adjacencyList[destination].push(source);
	}
	removeEdge(source, destination) {
		this.adjacencyList[source] =
			this.adjacencyList[source].filter(vertex => vertex !== destination);
		this.adjacencyList[destination] =
			this.adjacencyList[destination].filter(vertex => vertex !== source);
	}
	removeVertex(vertex) {
		while (this.adjacencyList[vertex]) {
			const adjacentVertex = this.adjacencyList[vertex].pop();
			this.removeEdge(vertex, adjacentVertex);
		}
		delete this.adjacencyList[vertex];
	}

	BFS(vertex) {
		const q = [vertex]
		const result = []
		const visited = { [vertex]: true }

		while (q[0]) {
			const node = q.shift()
			result.push(node)

			// get the nodes edges and put it in the queue
			for (const edge of this.adjacencyList[node]) {
				if (!visited[edge]) {
					q.push(edge)
					visited[edge] = true
				}
			}

		}
		return result
	}

	DFS(vertex) {
		const stack = [vertex]
		const result = []
		const visisted = { [vertex]: true }

		while (stack[0]) {
			const node = stack.pop()
			result.push(node)
			visisted[node] = true

			for (const edge of this.adjacencyList[node]) {
				if (!visited[edge]) {
					q.push(edge)
					visited[edge] = true
				}
			}
		}
		return result
	}
}


let path = [
	[1, 0, 1, 1, 1, 1, 1],
	[1, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1],

]


function pathFinder(map, start_x, start_y) {
	// direction meanins: top    right  bottom    left
	const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
	const path = []

	const printMap = (map) => {
		let str = ''
		for (const row of map) {
			str += row.join('') + '\n'
		}
		console.log(str)
	}

	const isInMap = (x, y) => map[y] && map[y][x] !== undefined

	const find = (x, y) => {
		// mark we have been hear
		map[y][x] = 3
		printMap(map)
		path.push([y, x])
		for (const dir of directions) {
			const next_x = x + dir[0]
			const next_y = y + dir[1]
			if (isInMap(next_x, next_y)) {
				if (map[next_y][next_x] === 1) {
					// take the next step
					find(next_x, next_y)
				}
			}
		}
		return path
	}
	return find(start_x, start_y)
}

console.log(pathFinder(path, 4, 1))
