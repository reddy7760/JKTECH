class Task {
    constructor(id, processingTime, dependencies, priority) {
        this.task_id = id;
        this.processingTime  = processingTime;
        this.dependencies = dependencies;
        this.priority = priority;
    }

}

class TaskScheduler extends Task {
    constructor(max_concurrent){
        super(max_concurrent)
        this.tasks = [];
        this.max_concurrent = max_concurrent;
    }
    
    addTasks(tasks) {
    this.tasks = tasks;
    }
// handling the concurrency using async and promises and timer function 

    async run() {
        this.MaxConCurrencyTask = []; // capturing the tasks based on Max concurrency input
        this.count = 0;
        for(let i=0;i <this.tasks.length; i+=this.max_concurrent) {
             this.MaxConCurrencyTask = this.tasks.slice(i, i + this.max_concurrent);
        }

        for(let task of this.tasks) {
            
         new Promise((resolve, reject) => {
                setTimeout(() => {
                        resolve(`Task ${task.id} started`);
                    if(!task.id) {
                        reject('Something went wrong !!');
                    }
                }, task.priority);                 
            }).then((reslove) => {
                console.log(reslove);
            }).then(()=>  {
                this.count++;
                console.log(`Task ${task.id} completed`);
                console.log(`Tasks Completed: ${this.count}`);
            }).catch((e) => {
                console.error(e);
            })
        }
        // used Promises to run maximum parallel tasks based on mentioned concurrency 

        return await Promise.all(this.MaxConCurrencyTask).then((resolve) => {
            console.log(resolve);
        }).catch(e => {
            console.error(e);
        });
       
    }
}
const tasks = [
    { id: "task1", processingTime: 2, dependencies: [],              priority: 1 },
    { id: "task2", processingTime: 1, dependencies: ["task1"],       priority: 2 },
    { id: "task3", processingTime: 3, dependencies: ["task1"],       priority: 1 },
    { id: "task4", processingTime: 1, dependencies: ["task2","task3"], priority: 3 },
    { id: "task5", processingTime: 2, dependencies: ["task4"],       priority: 2 },
    { id: "task6", processingTime: 2, dependencies: ["task5"],       priority: 1 },
    { id: "task7", processingTime: 1, dependencies: ["task5"],       priority: 3 },
    { id: "task8", processingTime: 2, dependencies: ["task5"],       priority: 2 }
  ];
  
scheduler = new TaskScheduler(max_concurrent = 2);
scheduler.addTasks(tasks);
scheduler.run();