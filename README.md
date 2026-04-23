# 💽 Disk Scheduling Simulator

A web-based **Disk Scheduling Simulator** that visualizes and compares different disk scheduling algorithms such as **FCFS, SSTF, SCAN, and C-SCAN**. This project helps in understanding disk head movement and analyzing performance metrics like seek time.

---

## 🚀 Features

✅ Accepts user input:

* Disk Size
* Initial Head Position
* Request Sequence

✅ Implements Multiple Algorithms:

* **FCFS (First Come First Serve)**
* **SSTF (Shortest Seek Time First)**
* **SCAN (Elevator Algorithm)**
* **C-SCAN (Circular SCAN)**

✅ Visualization

* Graphical disk head movement
* Algorithm comparison charts
* Real-time simulation output

✅ Performance Metrics

* Total Seek Time
* Average Seek Time
* Throughput
* Maximum Seek

✅ Extra Features

* Compare all algorithms together
* Input validation
* Interactive and user-friendly UI

---

# 🧠 Project Overview

Disk scheduling is an important concept in Operating Systems.
Since disk access is slower than CPU operations, requests must be scheduled efficiently to reduce seek time and improve performance.

This simulator allows users to:

* Enter custom disk requests
* Run different scheduling algorithms
* Visualize head movement
* Compare performance metrics

It provides a practical way to understand how each algorithm behaves.

---

# 🧩 System Modules

## 🔹 Input Module

Collects and validates:

* Disk size
* Initial head position
* Request sequence
* Direction (for SCAN/C-SCAN)

---

## 🔹 Algorithm Module

Processes requests using:

### FCFS

Services requests in arrival order.

### SSTF

Chooses nearest request first.

### SCAN

Moves in one direction, serves requests, then reverses.

### C-SCAN

Moves only in one direction and jumps back to start.

---

## 🔹 Performance Module

Calculates:

* Total seek time
* Average seek time
* Throughput
* Maximum seek distance

---

## 🔹 Visualization Module

Displays:

* Disk head movement graphs
* Seek comparison charts
* Algorithm performance comparison

---

# 📊 Data Flow Diagram (DFD)

## DFD Level 0 (Context Diagram)

```text
+--------+         Input Requests         +-------------------+
| User   | -----------------------------> | Disk Scheduling   |
|        |                                | Simulator System  |
|        | <----------------------------- | Results + Graphs  |
+--------+             Output             +-------------------+
```

---

## DFD Level 1 (Detailed Flow)

```text
User
 |
 v
Input Module
 |
 v
Algorithm Module
 |------ FCFS
 |------ SSTF
 |------ SCAN
 |------ C-SCAN
 |
 v
Performance Module
 |
 v
Visualization Module
 |
 v
Results to User
```

---

# ⚙️ Algorithms Implemented

## 🔸 FCFS (First Come First Serve)

Processes requests in order received.

**Advantages**

* Simple implementation
* Fair scheduling

**Disadvantages**

* High seek time
* Poor performance

---

## 🔸 SSTF (Shortest Seek Time First)

Chooses nearest request to current head.

**Advantages**

* Lower seek time
* Better performance than FCFS

**Disadvantages**

* Starvation possible

---

## 🔸 SCAN (Elevator Algorithm)

Head moves in one direction serving requests and then reverses.

**Advantages**

* Efficient
* Reduced waiting time

---

## 🔸 C-SCAN (Circular SCAN)

Moves in one direction only and returns to beginning.

**Advantages**

* Uniform waiting time
* Fair distribution

---

# 📈 Example

## Input

```text
Head Position = 50
Requests = 82, 170, 43, 140, 24, 16, 190
```

## FCFS Order

```text
50 → 82 → 170 → 43 → 140 → 24 → 16 → 190
```

Example comparisons:

| Algorithm | Total Seek (Approx) |
| --------- | ------------------- |
| FCFS      | 642                 |
| SSTF      | 208                 |
| SCAN      | 332                 |
| C-SCAN    | 391                 |

🏆 SSTF gives minimum seek time in this case.

---

# 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Chart.js
* GitHub
* VS Code

---

# 📂 Project Structure

```bash
Disk-Scheduling-Simulator/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

---

# 📦 Installation & Usage

## 1 Clone Repository

```bash
git clone https://github.com/yourusername/disk-scheduling-simulator.git
```

## 2 Move into project folder

```bash
cd disk-scheduling-simulator
```

## 3 Run Project

Open:

```bash
index.html
```

Or use VS Code Live Server.

---

# ▶️ How To Use

1. Enter disk size.
2. Enter head position.
3. Enter request sequence.
4. Select algorithm.
5. Click **Simulate**.
6. View:

* Seek path
* Performance metrics
* Graph visualization
* Compare All graph

---

# 📊 Compare All Output

Simulator compares algorithms using:

* Total Seek Time
* Average Seek Time
* Maximum Seek
* Throughput

Typical Result:

* SSTF → Lowest seek time ✅
* FCFS → Highest seek time ❌
* SCAN/C-SCAN → Balanced performance ⚖️

---

# 🔮 Future Enhancements

Possible improvements:

* LOOK algorithm
* C-LOOK algorithm
* Animated head movement
* Real-time request queue simulation
* Dark mode UI
* Export graphs as image/PDF

---

# 🎯 Applications

Useful for:

* Operating Systems Lab Projects
* Educational demonstrations
* Algorithm visualization
* Performance analysis studies

---

# 🧪 Input Validation Rules

The simulator validates:

✔ Requests within disk range

✔ Numeric inputs only

✔ Head position within disk size

✔ Proper comma-separated request format

---

# 📚 Learning Outcomes

Using this project helps understand:

* Disk scheduling concepts
* Seek optimization
* Algorithm comparison
* Operating system resource management

---

# 🤝 Contribution

Contributions are welcome.

Steps:

```bash
Fork repository
Create feature branch
Commit changes
Push branch
Open Pull Request
```

---

# 📜 License

This project is open-source under the MIT License.

---

## 👨‍💻 Author

Developed as an Operating Systems Mini Project.

---

## ⭐ If you like this project

Give it a star on GitHub.

---

## Sample Output Screenshot (Add Your Screenshots Here)

```text
[ Add Simulator UI Screenshot ]
[ Add Comparison Graph Screenshot ]
[ Add Disk Movement Graph Screenshot ]
```

---

## Viva Questions You Can Explain From This Project

1. What is disk scheduling?
2. Why is SSTF better than FCFS?
3. Difference between SCAN and C-SCAN?
4. What is seek time?
5. Why throughput matters?
6. Which algorithm is best and why?

---

## 📌 Conclusion

The **Disk Scheduling Simulator** provides a practical and interactive way to study how disk scheduling algorithms optimize seek operations. By visualizing head movement and comparing metrics, users can clearly understand algorithm efficiency and performance.

---
