/* =========================================
   STUDENT PORTFOLIO JAVASCRIPT
   Contact Form + Academic Planner
========================================= */


/* =========================================
   1. CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Prevent the page from refreshing.
        event.preventDefault();

        // Get the values entered into the form.
        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const status = document.getElementById("contact-status");

        // Check that all fields contain information.
        if (!name || !email || !subject || !message) {

            status.textContent = "Please complete all the fields.";
            return;

        }

        // Replace this with your real email address.
        const recipient = "uchechukwup307@gmail.com";

        // Prepare the email information.
        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message
        );

        // Build the email link.
        const emailLink =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        // Tell the user what is happening.
        status.textContent = "Opening your email application...";

        // Open the user's default email application.
        window.location.href = emailLink;

    });

}


/* =========================================
   2. ACADEMIC PLANNER
========================================= */

const taskForm = document.getElementById("task-form");

if (taskForm) {

    const taskTitle = document.getElementById("task-title");
    const taskSubject = document.getElementById("task-subject");
    const taskDate = document.getElementById("task-date");
    const taskPriority = document.getElementById("task-priority");

    const taskList = document.getElementById("task-list");
    const taskCount = document.getElementById("task-count");

    // Load saved tasks from the browser.
    let tasks = [];

    try {

        const savedTasks = localStorage.getItem("studentPlannerTasks");

        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);

            if (Array.isArray(parsedTasks)) {
                tasks = parsedTasks;
            }
        }

    } catch (error) {

        console.error("Could not load saved tasks:", error);

    }


    // Save tasks in the browser.
    function saveTasks() {

        try {

            localStorage.setItem(
                "studentPlannerTasks",
                JSON.stringify(tasks)
            );

        } catch (error) {

            console.error("Could not save tasks:", error);

            alert("Your browser could not save the tasks.");

        }

    }


    // Display the tasks on the page.
    function displayTasks() {

        taskList.innerHTML = "";

        const emptyMessage = document.createElement("p");

        emptyMessage.id = "empty-message";

        if (tasks.length === 0) {

            emptyMessage.textContent = "You haven't added any tasks yet.";

            taskList.appendChild(emptyMessage);

        } else {

            tasks.forEach(function (task) {

                const taskCard = document.createElement("article");

                taskCard.className = "task-card";

                if (task.completed) {
                    taskCard.classList.add("completed");
                }


                // Task title.
                const title = document.createElement("h3");

                title.textContent = task.title;

                taskCard.appendChild(title);


                // Subject.
                const subject = document.createElement("p");

                subject.textContent = "Subject: " + task.subject;

                taskCard.appendChild(subject);


                // Due date.
                const date = document.createElement("p");

                date.textContent = "Due date: " + task.date;

                taskCard.appendChild(date);


                // Priority.
                const priority = document.createElement("p");

                priority.textContent = "Priority: " + task.priority;

                taskCard.appendChild(priority);


                // Completion status.
                const status = document.createElement("p");

                status.textContent = task.completed
                    ? "Status: Completed"
                    : "Status: Not completed";

                taskCard.appendChild(status);


                // Button container.
                const buttonContainer = document.createElement("div");

                buttonContainer.className = "task-buttons";


                // Complete or undo button.
                const completeButton = document.createElement("button");

                completeButton.type = "button";

                completeButton.textContent = task.completed
                    ? "Mark as Incomplete"
                    : "Mark as Completed";

                completeButton.className = "task-action-button";


                completeButton.addEventListener("click", function () {

                    task.completed = !task.completed;

                    saveTasks();

                    displayTasks();

                });


                buttonContainer.appendChild(completeButton);


                // Delete button.
                const deleteButton = document.createElement("button");

                deleteButton.type = "button";

                deleteButton.textContent = "Delete Task";

                deleteButton.className = "delete-task-button";


                deleteButton.addEventListener("click", function () {

                    const confirmed = confirm(
                        "Are you sure you want to delete this task?"
                    );

                    if (confirmed) {

                        tasks = tasks.filter(function (item) {

                            return item.id !== task.id;

                        });

                        saveTasks();

                        displayTasks();

                    }

                });


                buttonContainer.appendChild(deleteButton);

                taskCard.appendChild(buttonContainer);

                taskList.appendChild(taskCard);

            });

        }


        // Count unfinished tasks.
        const remainingTasks = tasks.filter(function (task) {

            return !task.completed;

        }).length;


        taskCount.textContent =
            remainingTasks +
            (remainingTasks === 1 ? " task remaining" : " tasks remaining");

    }


    // Add a new task when the form is submitted.
    taskForm.addEventListener("submit", function (event) {

        // Prevent the page from refreshing.
        event.preventDefault();


        // Get the information entered by the user.
        const title = taskTitle.value.trim();

        const subject = taskSubject.value.trim();

        const date = taskDate.value;

        const priority = taskPriority.value;


        // Check the required fields.
        if (!title || !subject || !date) {

            alert("Please complete all required task fields.");

            return;

        }


        // Create a new task.
        const newTask = {

            id: Date.now().toString() + Math.random().toString(16).slice(2),

            title: title,

            subject: subject,

            date: date,

            priority: priority,

            completed: false

        };


        // Add the task to the list.
        tasks.push(newTask);


        // Save the updated list.
        saveTasks();


        // Update the page.
        displayTasks();


        // Clear the form.
        taskForm.reset();

    });


    // Display previously saved tasks when the page opens.
    displayTasks();

}