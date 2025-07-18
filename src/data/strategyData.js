// Harry Potter themed 12-week mastery strategy data
export const strategyData = {
  title: "12-Week Mastery Plan: The Uncompromising Edition",
  subtitle: "Your Journey to Programming Mastery at Hogwarts",
  totalWeeks: 12,
  totalHours: 504,
  lectureHours: 88,
  practiceHours: 416,
  successRate: 90,
  
  phases: [
    {
      id: 1,
      name: "SQL Database Mastery",
      description: "Foundation for all other technologies, immediate practical use",
      color: "#4caf50",
      icon: "database",
      house: "Gryffindor",
      spells: ["SELECT", "JOIN", "WHERE", "GROUP BY"],
      
      weeks: [
        {
          weekNumber: 1,
          title: "SQL Fundamentals",
          lectures: [1, 2, 3, 4],
          days: [
            {
              day: 1,
              title: "Basic SQL Operations",
              sessions: [
                {
                  id: 1,
                  title: "Lecture 1 + Query Practice",
                  duration: 2.5,
                  topics: ["SELECT, FROM, WHERE fundamentals", "Practice with real datasets"],
                  tasks: ["Write basic SELECT queries", "Practice filtering with WHERE", "Work with sample database"]
                },
                {
                  id: 2,
                  title: "Advanced Filtering",
                  duration: 2.5,
                  topics: ["LIKE, IN, BETWEEN, NULL handling", "Complex WHERE conditions"],
                  tasks: ["Master LIKE patterns", "Handle NULL values", "Complex filtering exercises"]
                },
                {
                  id: 3,
                  title: "Query Optimization",
                  duration: 1,
                  topics: ["Query optimization and debugging"],
                  tasks: ["Debug slow queries", "Optimize query performance", "Practice best practices"]
                }
              ]
            },
            {
              day: 2,
              title: "Joins and Relationships",
              sessions: [
                {
                  id: 4,
                  title: "JOIN Mastery",
                  duration: 2.5,
                  topics: ["INNER, LEFT, RIGHT, FULL OUTER joins", "Multiple table operations"],
                  tasks: ["Practice all join types", "Work with multiple tables", "Complex join scenarios"]
                },
                {
                  id: 5,
                  title: "Advanced Relationships",
                  duration: 2.5,
                  topics: ["Subqueries, correlated queries", "Complex data relationships"],
                  tasks: ["Write subqueries", "Correlated queries practice", "Complex relationship scenarios"]
                },
                {
                  id: 6,
                  title: "Real-world Problems",
                  duration: 1,
                  topics: ["Real-world database problems"],
                  tasks: ["Solve complex database problems", "Apply learned concepts", "Practice scenarios"]
                }
              ]
            },
            {
              day: 3,
              title: "Database Design",
              sessions: [
                {
                  id: 7,
                  title: "Database Design Principles",
                  duration: 2.5,
                  topics: ["Normalization", "Database design principles"],
                  tasks: ["Design normalized schemas", "Apply normalization rules", "Design database structure"]
                },
                {
                  id: 8,
                  title: "E-commerce Database",
                  duration: 2.5,
                  topics: ["E-commerce database system"],
                  tasks: ["Design e-commerce schema", "Implement relationships", "Create sample data"]
                },
                {
                  id: 9,
                  title: "Social Media Database",
                  duration: 1,
                  topics: ["Social media database system"],
                  tasks: ["Design social media schema", "User relationships", "Content management"]
                }
              ]
            }
          ]
        },
        {
          weekNumber: 2,
          title: "Advanced SQL and Database Administration",
          lectures: [5, 6, 7, 8],
          days: [
            {
              day: 8,
              title: "Advanced Operations",
              sessions: [
                {
                  id: 10,
                  title: "Aggregate Functions",
                  duration: 2.5,
                  topics: ["GROUP BY, HAVING, window functions", "Statistical operations on datasets"],
                  tasks: ["Master GROUP BY", "Use HAVING clause", "Window functions practice"]
                },
                {
                  id: 11,
                  title: "Stored Procedures",
                  duration: 2.5,
                  topics: ["Functions, procedures, triggers", "Database automation"],
                  tasks: ["Create stored procedures", "Write functions", "Implement triggers"]
                },
                {
                  id: 12,
                  title: "Performance Optimization",
                  duration: 1,
                  topics: ["Performance optimization techniques"],
                  tasks: ["Optimize slow queries", "Index optimization", "Performance monitoring"]
                }
              ]
            },
            {
              day: 9,
              title: "Database Administration",
              sessions: [
                {
                  id: 13,
                  title: "Security Implementation",
                  duration: 2.5,
                  topics: ["User management, permissions, security", "Database backup and recovery"],
                  tasks: ["Set up user permissions", "Implement security measures", "Backup and recovery procedures"]
                },
                {
                  id: 14,
                  title: "Scaling Strategies",
                  duration: 2.5,
                  topics: ["Indexing, partitioning, replication", "Performance tuning and monitoring"],
                  tasks: ["Create indexes", "Partition tables", "Set up replication"]
                },
                {
                  id: 15,
                  title: "Enterprise Management",
                  duration: 1,
                  topics: ["Enterprise database management"],
                  tasks: ["Enterprise-level administration", "Monitoring and maintenance", "Best practices"]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Python Programming Mastery",
      description: "Building on database knowledge, foundational for modern development",
      color: "#2196f3",
      icon: "code",
      house: "Ravenclaw",
      spells: ["def", "class", "import", "lambda"],
      
      weeks: [
        {
          weekNumber: 3,
          title: "Python Fundamentals",
          lectures: [1, 2, 3, 4, 5],
          days: [
            {
              day: 15,
              title: "Python Basics",
              sessions: [
                {
                  id: 16,
                  title: "Python Syntax and Variables",
                  duration: 2.5,
                  topics: ["Python syntax, variables, data types"],
                  tasks: ["Write basic Python code", "Work with variables", "Practice data types"]
                },
                {
                  id: 17,
                  title: "Control Structures",
                  duration: 2.5,
                  topics: ["Control structures, functions, modules"],
                  tasks: ["Write if/else statements", "Create functions", "Import modules"]
                },
                {
                  id: 18,
                  title: "Coding Practice",
                  duration: 1,
                  topics: ["Immediate coding practice and debugging"],
                  tasks: ["Build simple programs", "Debug code", "Practice problem-solving"]
                }
              ]
            }
          ]
        },
        {
          weekNumber: 4,
          title: "Advanced Python Concepts",
          lectures: [11, 12, 13, 14, 15],
          days: [
            {
              day: 22,
              title: "OOP Mastery",
              sessions: [
                {
                  id: 19,
                  title: "Classes and Objects",
                  duration: 2.5,
                  topics: ["Classes, objects, inheritance, polymorphism"],
                  tasks: ["Create classes", "Implement inheritance", "Use polymorphism"]
                },
                {
                  id: 20,
                  title: "Advanced Features",
                  duration: 2.5,
                  topics: ["Advanced Python features and decorators"],
                  tasks: ["Use decorators", "Advanced features", "Best practices"]
                },
                {
                  id: 21,
                  title: "Integration Projects",
                  duration: 1,
                  topics: ["Python-SQL integration projects"],
                  tasks: ["Connect to databases", "Use ORMs", "Build data processing apps"]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Java Programming Methodology Excellence",
      description: "Building on programming foundations, leveraging intermediate knowledge",
      color: "#ff9800",
      icon: "coffee",
      house: "Hufflepuff",
      spells: ["public", "class", "static", "void"],
      
      weeks: [
        {
          weekNumber: 7,
          title: "Java Architecture and Design",
          lectures: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          days: [
            {
              day: 43,
              title: "Advanced OOP and Design Patterns",
              sessions: [
                {
                  id: 22,
                  title: "Advanced OOP Review",
                  duration: 2.5,
                  topics: ["Polymorphism, abstraction, encapsulation mastery", "Interface design and implementation"],
                  tasks: ["Implement OOP concepts", "Design interfaces", "Practice encapsulation"]
                },
                {
                  id: 23,
                  title: "Design Patterns",
                  duration: 2.5,
                  topics: ["Singleton, Factory, Observer patterns", "Strategy, Command, Decorator patterns"],
                  tasks: ["Implement Singleton", "Create Factory pattern", "Use Observer pattern"]
                },
                {
                  id: 24,
                  title: "Pattern Implementation",
                  duration: 1,
                  topics: ["Pattern implementation practice"],
                  tasks: ["Practice design patterns", "Build pattern examples", "Apply patterns"]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Operating Systems Mastery",
      description: "Foundational knowledge that enhances all previous learning",
      color: "#9c27b0",
      icon: "computer",
      house: "Slytherin",
      spells: ["fork", "exec", "pipe", "signal"],
      
      weeks: [
        {
          weekNumber: 10,
          title: "OS Fundamentals",
          lectures: [1, 2, 3, 4, 5, 6, 7, 8],
          days: [
            {
              day: 64,
              title: "Core OS Concepts",
              sessions: [
                {
                  id: 25,
                  title: "OS Introduction",
                  duration: 2.5,
                  topics: ["Operating system architecture and components", "System calls and kernel interaction"],
                  tasks: ["Understand OS architecture", "Learn system calls", "Kernel interaction"]
                },
                {
                  id: 26,
                  title: "Process Management",
                  duration: 2.5,
                  topics: ["Process creation, scheduling, synchronization", "Inter-process communication"],
                  tasks: ["Create processes", "Process scheduling", "IPC mechanisms"]
                },
                {
                  id: 27,
                  title: "OS Implementation",
                  duration: 1,
                  topics: ["OS concept implementation exercises"],
                  tasks: ["Implement OS concepts", "Practice exercises", "Apply knowledge"]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  
  successMetrics: {
    week1: ["Write complex SQL queries without references", "Design normalized database schemas from scratch"],
    week2: ["Implement database security and optimization", "Debug and optimize slow queries"],
    week4: ["Build complex Python applications from scratch", "Implement advanced OOP design patterns"],
    week6: ["Integrate Python with databases seamlessly", "Debug and optimize Python code efficiently"],
    week8: ["Implement complex design patterns fluently", "Build enterprise-level Java applications"],
    week9: ["Optimize Java application performance", "Integrate Java with databases and web services"],
    week11: ["Understand OS architecture and components thoroughly", "Implement concurrent programming solutions"],
    week12: ["Optimize system performance using OS knowledge", "Apply OS concepts to enhance programming skills"]
  },
  
  redFlags: {
    week1: "Can't write basic SQL queries independently",
    week3: "Can't build simple Python programs",
    week5: "Can't implement Python OOP concepts",
    week7: "Can't implement Java design patterns",
    week9: "Can't build enterprise Java applications",
    week11: "Can't apply OS concepts to programming",
    week12: "Can't integrate all technologies effectively"
  },
  
  studyTechniques: [
    "Feynman Technique: Explain every concept aloud within 30 minutes",
    "Immediate Implementation: Code/practice within 5 minutes of learning",
    "Spaced Repetition: Review previous material for 30 minutes daily",
    "Teaching Method: Record explanations weekly for review",
    "Cross-Referencing: Connect new concepts to previous learning"
  ],
  
  healthProtocols: {
    sleep: "7-8 hours nightly, no exceptions ever",
    exercise: "45 minutes daily, varying intensity",
    nutrition: "Regular meals, minimal processed foods",
    hydration: "3+ liters water daily",
    breaks: "Every 2.5 hours: 30-minute break minimum"
  }
};

export const getCurrentWeek = () => {
  const startDate = new Date('2024-01-01'); // Adjust as needed
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.min(Math.ceil(diffDays / 7), 12);
};

export const getCurrentDay = () => {
  const startDate = new Date('2024-01-01'); // Adjust as needed
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateProgress = (completedSessions, totalSessions) => {
  return Math.round((completedSessions / totalSessions) * 100);
};

export const getPhaseByWeek = (week) => {
  if (week <= 2) return strategyData.phases[0];
  if (week <= 6) return strategyData.phases[1];
  if (week <= 9) return strategyData.phases[2];
  return strategyData.phases[3];
}; 