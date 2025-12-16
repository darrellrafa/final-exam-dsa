# Algorithm Analysis Web Application - Complete Guide

## 📋 Overview

Aplikasi web ini dibuat dengan Next.js dan TypeScript untuk menjawab soal-soal analisis algoritma, termasuk:

1. **Analisis Persamaan Rekurensi** - Menganalisis fungsi XYZ dengan divide and conquer
2. **Analisis Kompleksitas Waktu** - Menghitung time complexity secara detail
3. **Konstruksi Optimal BST** - Membangun Binary Search Tree optimal dengan visualisasi

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites
- Node.js (versi 18 atau lebih baru)
- npm atau yarn

### Langkah-Langkah

1. **Buka terminal di direktori project:**
   ```bash
   cd c:\Users\PC\Documents\GitHub\final-exam-dsa
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka browser dan akses:**
   ```
   http://localhost:3000
   ```

## 📖 Fitur Aplikasi

### 1. Recurrence Equation (Tab 1)

Menampilkan analisis lengkap dari fungsi XYZ:

```cpp
int XYZ(int Arr[], int L, int R) {
    if(L == R) 
        return (Arr[L] > 0) ? Arr[L] : 0;
    
    int C = (L + R)/2;
    int A = XYZ(Arr, L, C);
    int B = XYZ(Arr, C+1, R);
    
    int D = 0, E = 0;
    for(int i = C; i >= L; --i) {
        E += Arr[i];
        if(E > D) D = E;
    }
    
    int F = 0, G = 0;
    for(int j = C+1; j <= R; ++j) {
        G += Arr[j];
        if(G > F) F = G;
    }
    
    return Max3(A, B, D+F);
}
```

**Hasil Analisis:**
- Persamaan Rekurensi: `T(n) = 2T(n/2) + Θ(n)`
- Solusi menggunakan Master Theorem
- Kesimpulan: **T(n) = Θ(n log n)**

**Penjelasan:**
- Fungsi ini mencari **maximum contiguous subarray sum** menggunakan divide and conquer
- Di setiap level rekursi, dilakukan pekerjaan O(n) untuk mencari crossing sum
- Dengan log n level, total kompleksitas adalah O(n log n)

### 2. Time Complexity Analysis (Tab 2)

Menampilkan breakdown detail kompleksitas waktu:

**Breakdown per bagian:**
1. **Base Case**: O(1)
2. **Divide Step**: 2T(n/2) - dua recursive calls
3. **Left Crossing**: O(n/2) - loop dari tengah ke kiri
4. **Right Crossing**: O(n/2) - loop dari tengah ke kanan
5. **Combine**: O(1) - perbandingan

**Total:** T(n) = 2T(n/2) + O(n) = **Θ(n log n)**

### 3. Optimal BST Construction (Tab 3)

Fitur paling kompleks yang mengimplementasikan algoritma dynamic programming untuk membuat optimal Binary Search Tree.

**Data yang Digunakan:**
```
(lot, 5), (of, 7), (I, 10), (ball, 11), (eat, 15), 
(a, 17), (and, 12), (friends, 12), (meat, 10)
```

**Output yang Ditampilkan:**

1. **Total Optimal Cost** - Total biaya minimal BST
2. **Cost Table** - Tabel DP cost[i][j] yang menunjukkan biaya minimal untuk keys dari i ke j
3. **Root Table** - Tabel root[i][j] yang menunjukkan index root optimal untuk range [i,j]
4. **Sorted Keys and Frequencies** - Keys yang sudah diurutkan dengan frekuensinya
5. **Tree Structure (Text)** - Representasi tree dalam bentuk ASCII art
6. **Tree Visualization (SVG)** - Visualisasi tree menggunakan SVG dengan:
   - Nodes sebagai circles dengan label key dan frequency
   - Edges menghubungkan parent-child
   - Layout otomatis untuk menampilkan struktur tree

**Cara Menggunakan:**
1. Klik tab "3. Optimal BST"
2. Data sudah ter-isi otomatis (bisa diubah jika perlu)
3. Klik tombol "Construct Optimal BST"
4. Hasil akan muncul di bawah form, termasuk:
   - Total cost
   - Cost table (tabel biaya)
   - Root table (tabel root)
   - Keys yang sudah sorted
   - Tree structure dalam text
   - Tree visualization dalam SVG

## 🎯 Algoritma Optimal BST

Algoritma menggunakan Dynamic Programming:

```typescript
// Untuk setiap kombinasi [i, j] dari keys
for (let L = 2; L <= n; L++) {
    for (let i = 0; i <= n - L; i++) {
        const j = i + L - 1;
        
        // Coba setiap key sebagai root
        for (let r = i; r <= j; r++) {
            const leftCost = r > i ? cost[i][r-1] : 0;
            const rightCost = r < j ? cost[r+1][j] : 0;
            const sum = freq[i] + ... + freq[j];
            const currentCost = leftCost + rightCost + sum;
            
            if (currentCost < cost[i][j]) {
                cost[i][j] = currentCost;
                root[i][j] = r;  // Simpan root optimal
            }
        }
    }
}
```

**Kompleksitas:**
- Time: O(n³) - tiga nested loops
- Space: O(n²) - untuk tabel cost dan root

## 🎨 Desain

Aplikasi menggunakan:
- **Tailwind CSS** untuk styling
- **Google Fonts (Inter)** untuk typography
- **Dark theme** dengan gradient colors
- **Smooth animations** untuk transisi
- **Responsive design** untuk berbagai ukuran layar

## 📁 Struktur File

```
final-exam-dsa/
├── app/
│   ├── page.tsx              # Main page dengan tab navigation
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── RecurrenceAnalysis.tsx      # Tab 1: Recurrence equation
│   ├── TimeComplexityAnalysis.tsx  # Tab 2: Time complexity
│   ├── OptimalBSTForm.tsx          # Tab 3: Input form
│   └── BSTVisualization.tsx        # Tab 3: Results display
├── lib/
│   ├── optimal-bst.ts              # Optimal BST algorithm
│   └── tree-builder.ts             # Tree visualization helper
└── package.json
```

## 🔧 Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inter)
- **Package Manager**: npm

## 📊 Jawaban Lengkap Soal

### Soal 1: Persamaan Rekurensi

**Recurrence Equation:**
```
T(n) = 2T(n/2) + Θ(n)
```

**Analisis:**
- 2T(n/2): Dua recursive calls pada setengah array
- Θ(n): Linear work untuk menemukan max crossing sum

**Solusi dengan Master Theorem:**
- a = 2, b = 2, f(n) = Θ(n)
- n^(log_b a) = n^(log_2 2) = n^1 = n
- f(n) = Θ(n) = Θ(n^(log_b a))
- **Case 2**: T(n) = Θ(n^(log_b a) log n) = **Θ(n log n)**

### Soal 2: Time Complexity

**Detail Analysis:**

1. Base case: `if(L == R)` → **O(1)**
2. Recursion: `XYZ(L,C) + XYZ(C+1,R)` → **2T(n/2)**
3. Left loop: `for(i = C; i >= L)` → **O(n/2)**
4. Right loop: `for(j = C+1; j <= R)` → **O(n/2)**
5. Max3 comparison → **O(1)**

**Total:**
```
T(n) = 2T(n/2) + O(n/2) + O(n/2) + O(1)
T(n) = 2T(n/2) + O(n)
T(n) = Θ(n log n)
```

**Explanation:**
- Setiap level rekursi: O(n) work
- Jumlah level: log n (membagi dua setiap kali)
- Total: O(n) × log n = **O(n log n)**

### Soal 3: Optimal BST

**Input Data (sorted by key):**
```
Index  Key       Frequency
  0    I         10
  1    a         17
  2    and       12
  3    ball      11
  4    eat       15
  5    friends   12
  6    lot       5
  7    meat      10
  8    of        7
```

**Cost Table:**
Tabel cost[i][j] menunjukkan biaya minimal untuk membuat BST dari key index i sampai j.

**Root Table:**
Tabel root[i][j] menunjukkan index root optimal untuk range [i,j].

**Tree Structure:**
Aplikasi menampilkan struktur tree dalam dua format:
1. **Text representation** - ASCII art showing parent-child relationships
2. **SVG visualization** - Visual tree dengan nodes dan edges

**Total Optimal Cost:**
Ditampilkan di aplikasi setelah konstruksi BST selesai.

## 💡 Tips Penggunaan

1. **Navigation**: Gunakan tab buttons untuk berpindah antar section
2. **Optimal BST**: 
   - Data sudah pre-filled, tapi bisa diubah
   - Klik "+ Add Entry" untuk menambah data
   - Klik "×" untuk menghapus entry
3. **Scrolling**: Scroll down untuk melihat detail lengkap di setiap section
4. **Responsive**: Aplikasi dapat diakses dari device berbeda

## 🎓 Kesimpulan

Aplikasi ini memberikan solusi lengkap untuk:
1. ✅ Analisis persamaan rekurensi dengan Master Theorem
2. ✅ Perhitungan time complexity detail
3. ✅ Konstruksi optimal BST dengan visualisasi lengkap

Semua jawaban disajikan dengan:
- Penjelasan step-by-step
- Visualisasi yang jelas
- Interface yang interaktif dan modern
