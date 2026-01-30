// 1. Contact Model
class Contact {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}

// 2. Doubly Linked List Node
class ListNode {
    constructor(contact) {
        this.contact = contact;
        this.next = null;
        this.prev = null;
    }
}

// =====================
// 3. Contact Manager
// =====================
class ContactManager {
    constructor() {
        this.head = null;
        this.tail = null;
        this.contactMap = new Map(); // Hash table
    }

    // ---- Add Contact ----
    addContact(name, phone) {
        if (this.contactMap.has(name)) {
            console.log("❌ Contact already exists.");
            return;
        }

        const contact = new Contact(name, phone);
        const node = new ListNode(contact);

        // Add to hash table
        this.contactMap.set(name, contact);

        // Add to doubly linked list
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        console.log("✅ Contact added successfully.");
    }

    // ---- Search by Exact Name (Hash Table) ----
    searchByName(name) {
        const contact = this.contactMap.get(name);
        if (contact) {
            console.log(`🔍 Found: ${contact.name} - ${contact.phone}`);
        } else {
            console.log("❌ Contact not found.");
        }
    }

    // ---- Search by Keyword (Naive Substring Search) ----
    searchByKeyword(keyword) {
        let current = this.head;
        let found = false;

        console.log(`🔎 Searching for "${keyword}"...`);

        while (current) {
            if (
                current.contact.name
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
            ) {
                console.log(
                    `   ✔ ${current.contact.name} - ${current.contact.phone}`
                );
                found = true;
            }
            current = current.next;
        }

        if (!found) console.log("❌ No matches found.");
    }

    // ---- Display Forward ----
    displayForward() {
        let current = this.head;
        console.log("\n📜 Contacts (Forward):");

        if (!current) {
            console.log("   No contacts available.");
            return;
        }

        while (current) {
            console.log(
                `   ${current.contact.name} - ${current.contact.phone}`
            );
            current = current.next;
        }
    }

    // ---- Display Backward ----
    displayBackward() {
        let current = this.tail;
        console.log("\n📜 Contacts (Backward):");

        if (!current) {
            console.log("   No contacts available.");
            return;
        }

        while (current) {
            console.log(
                `   ${current.contact.name} - ${current.contact.phone}`
            );
            current = current.prev;
        }
    }
}

// =====================
// 4. CLI Menu
// =====================
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const manager = new ContactManager();

function showMenu() {
    console.log(`
1. Add Contact
2. Search by Keyword
3. Search by Exact Name
4. View All (Forward)
5. View All (Backward)
6. Exit
`);
}

function handleMenu(choice) {
    switch (choice) {
        case "1":
            rl.question("Enter name: ", (name) => {
                rl.question("Enter phone: ", (phone) => {
                    manager.addContact(name, phone);
                    main();
                });
            });
            break;

        case "2":
            rl.question("Enter keyword: ", (keyword) => {
                manager.searchByKeyword(keyword);
                main();
            });
            break;

        case "3":
            rl.question("Enter exact name: ", (name) => {
                manager.searchByName(name);
                main();
            });
            break;

        case "4":
            manager.displayForward();
            main();
            break;

        case "5":
            manager.displayBackward();
            main();
            break;

        case "6":
            console.log("👋 Exiting...");
            rl.close();
            break;

        default:
            console.log("❌ Invalid option.");
            main();
    }
}

function main() {
    showMenu();
    rl.question("Choose an option: ", handleMenu);
}

// Start program
main();
