💽 Disk Scheduling Simulator
A web-based Disk Scheduling Simulator that visualizes and compares different disk scheduling algorithms such as FCFS, SSTF, SCAN, and C-SCAN. The project helps in understanding disk head movement and analyzing performance metrics like seek time.

🚀 Features
📥 Accepts user input (disk size, head position, request sequence)
⚙️ Implements multiple algorithms:
FCFS (First Come First Serve)
SSTF (Shortest Seek Time First)
SCAN
C-SCAN
📊 Graphical visualization of disk head movement
⏱️ Calculates performance metrics:
Total Seek Time
Average Seek Time
Throughput
🔍 Compare performance of different algorithms
🧪 Input validation for accurate results
🧠 Project Overview
Disk scheduling is a key concept in operating systems. Since disk access is slower than CPU operations, efficient scheduling of disk requests is required to improve performance.

This simulator provides a practical understanding of how different scheduling algorithms work by allowing users to input requests and visualize disk head movement.

🧩 System Modules
🔹 Input Module
Collects user inputs such as disk size, head position, and request sequence. It also validates the inputs to ensure correctness.

🔹 Algorithm Module
Processes disk requests using different scheduling algorithms like FCFS, SSTF, SCAN, and C-SCAN.

🔹 Performance Module
Calculates important metrics such as total seek time, average seek time, and throughput.

🔹 Visualization Module
Displays the disk head movement graphically to help users understand algorithm behavior.

📊 Data Flow Diagram (DFD)
🔹 DFD Level 0 (Context Diagram)
DFD Level 0

This diagram shows the interaction between the user and the system. The user provides input, and the system processes it to generate output such as seek time and graph.

🔹 DFD Level 1 (Detailed Flow)
DFD Level 1

This diagram shows the internal working of the system divided into modules:

Input Module
Algorithm Module
Performance Module
Visualization Module
⚙️ Algorithms Implemented
🔸 FCFS (First Come First Serve)
Processes requests in the order they arrive. Simple but results in high seek time.

🔸 SSTF (Shortest Seek Time First)
Selects the closest request to the current head position. Reduces seek time but may cause starvation.

🔸 SCAN (Elevator Algorithm)
Moves in one direction servicing requests, then reverses. Improves efficiency.

🔸 C-SCAN (Circular SCAN)
Moves in one direction and jumps back to the beginning. Provides uniform waiting time.

📈 Example
Input:

Head = 50
Requests = 82, 170, 43, 140, 24, 16, 190
FCFS Order: 50 → 82 → 170 → 43 → 140 → 24 → 16 → 190

🛠️ Technologies Used
HTML (Structure)
CSS (Styling)
JavaScript (Logic & Algorithms)
Chart.js (Graph Visualization)
GitHub (Version Control)
VS Code (Development)
📦 Installation & Usage
