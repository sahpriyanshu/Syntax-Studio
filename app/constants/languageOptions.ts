export const languageOptions = [
  {
    id: 50,
    name: "C (GCC 9.3.0)",
    label: "C (GCC 9.3.0)",
    value: "c",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your C code here
#include <stdio.h>

int main(void) {
    printf("Hello World!\\n");
    return 0;
}`,
  },
  {
    id: 54,
    name: "C++ (G++ 9.3.0)",
    label: "C++ (G++ 9.3.0)",
    value: "cpp",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your C++ code here
#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl;
    return 0;
}`,
  },
  {
    id: 51,
    name: "C# (Mono 6.12.0)",
    label: "C# (Mono 6.12.0)",
    value: "csharp",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your C# code here
using System;

public class Program {
    public static void Main(string[] args) {
        Console.WriteLine("Hello World!");
    }
}`,
  },
  {
    id: 60,
    name: "Go (1.15.6)",
    label: "Go (1.15.6)",
    value: "go",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your Go code here
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}`,
  },
  {
    id: 62,
    name: "Java (OpenJDK 11.0.9)",
    label: "Java (OpenJDK 11.0.9)",
    value: "java",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your Java code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
  },
  {
    id: 63,
    name: "JavaScript (Node.js 14.16.0)",
    label: "JavaScript (Node.js 14.16.0)",
    value: "javascript",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your JavaScript code here
function main() {
    console.log("Hello World!");
}

main();`,
  },
  {
    id: 71,
    name: "Python (3.8.6)",
    label: "Python (3.8.6)",
    value: "python3",
    defaultCode: `# Copyright 2025 Priyanshu Sah. All Rights Reserved.
# Write your Python code here

def main():
    print("Hello World!")

if __name__ == "__main__":
    main()`,
  },
  {
    id: 72,
    name: "Ruby (2.7.1)",
    label: "Ruby (2.7.1)",
    value: "ruby",
    defaultCode: `# Copyright 2025 Priyanshu Sah. All Rights Reserved.
# Write your Ruby code here

def main
    puts "Hello World!"
end

main`,
  },
  {
    id: 68,
    name: "PHP (7.4.3)",
    label: "PHP (7.4.3)",
    value: "php",
    defaultCode: `<?php
// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your PHP code here

function main() {
    echo "Hello World!\\n";
}

main();`,
  },
  {
    id: 83,
    name: "Swift (5.3.1)",
    label: "Swift (5.3.1)",
    value: "swift",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your Swift code here
import Foundation

func main() {
    print("Hello World!")
}

main()`,
  },
  {
    id: 73,
    name: "Rust (1.48.0)",
    label: "Rust (1.48.0)",
    value: "rust",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your Rust code here

fn main() {
    println!("Hello World!");
}`,
  },
  {
    id: 61,
    name: "Haskell (GHC 8.10.3)",
    label: "Haskell (GHC 8.10.3)",
    value: "haskell",
    defaultCode: `-- Copyright 2025 Priyanshu Sah. All Rights Reserved.
-- Write your Haskell code here
module Main where

main :: IO ()
main = putStrLn "Hello World!"`,
  },
  {
    id: 78,
    name: "Kotlin (1.4.10)",
    label: "Kotlin (1.4.10)",
    value: "kotlin",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your Kotlin code here

fun main() {
    println("Hello World!")
}`,
  },
  {
    id: 81,
    name: "Scala (2.13.3)",
    label: "Scala (2.13.3)",
    value: "scala",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your Scala code here

object Main extends App {
    println("Hello World!")
}`,
  },
  {
    id: 79,
    name: "Objective-C (Clang 10.0.0)",
    label: "Objective-C (Clang 10.0.0)",
    value: "objc",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your Objective-C code here
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello World!");
    }
    return 0;
}`,
  },
  {
    id: 74,
    name: "TypeScript (4.1.3)",
    label: "TypeScript (Node.js 14.16.0 + TypeScript 4.1.3)",
    value: "typescript",
    defaultCode: `// Copyright 2025 Priyanshu Sah. All Rights Reserved.
// Write your TypeScript code here

function main(): void {
    console.log("Hello World!");
}

main();`,
  },
  {
    id: 80,
    name: "R (4.0.2)",
    label: "R (4.0.2)",
    value: "r",
    defaultCode: `# Copyright 2025 Priyanshu Sah. All Rights Reserved.
# Write your R code here

main <- function() {
    cat("Hello World!\\n")
}

main()`,
  },
  {
    id: 67,
    name: "Perl (5.30.0)",
    label: "Perl (5.30.0)",
    value: "perl",
    defaultCode: `#!/usr/bin/perl
# Copyright 2025 Priyanshu Sah. All Rights Reserved.
# Write your Perl code here
use strict;
use warnings;

sub main {
    print "Hello World!\\n";
}

main();`,
  },
  {
    id: 82,
    name: "Julia (1.5.3)",
    label: "Julia (1.5.3)",
    value: "julia",
    defaultCode: `# Copyright 2025 Priyanshu Sah. All Rights Reserved.
# Write your Julia code here

function main()
    println("Hello World!")
end

main()`
  }
]
