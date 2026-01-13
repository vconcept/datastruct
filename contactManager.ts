// 1. The Data Model
class Contact {
    constructor(public name: string, public phone: string) {}
}

// 2. The Node for the Doubly Linked List
class ListNode {
    public value: Contact;
    public next: ListNode | null;
    public prev: ListNode | null;

    constructor(val: Contact) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}

// 3. The Manager Class
class ContactManager {
    private head: ListNode | null;
    private tail: ListNode | null;
    // Hash Table for O(1) lookup
    private contactMap: Map<string, Contact>;

    constructor() {
        this.head = null;
        this.tail = null;
        this.contactMap = new Map();
    }

    // --- ADD CONTACT ---
    addContact(name: string, phone: string): void {
        // Check Hash Table for duplicates
        if (this.contactMap.has(name)) {
            console.log(`Error: Contact '${name}' already exists.`);
            return;
        }

        const newContact = new Contact(name, phone);
        
        // Add to Hash Table
        this.contactMap.set(name, newContact);

        // Add to Linked List
        const newNode = new ListNode(newContact);

        if (!this.head) {
            // List is empty
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Append to end
            if (this.tail) {
                this.tail.next = newNode; // Forward link
                newNode.prev = this.tail; // Backward link
                this.tail = newNode;      // Update tail
            }
        }
        console.log(`✅ Added: ${name}`);
    }

    // --- SEARCH BY EXACT NAME (Hash Table) ---
    searchByName(name: string): void {
        const contact = this.contactMap.get(name);
        if (contact) {
            console.log(`🔍 Found (Exact): ${contact.name} - ${contact.phone}`);
        } else {
            console.log(`❌ Contact '${name}' not found.`);
        }
    }

    // --- SEARCH BY SUBSTRING (Naive Search Algorithm) ---
    // Finds any contact where the name contains the keyword
    searchByKeyword(keyword: string): void {
        console.log(`\n🔎 Searching for keyword: "${keyword}"...`);
        let current = this.head;
        let found = false;

        while (current) {
            // We use a custom naive check (or standard includes)
            // Logic: Is 'keyword' inside 'current.value.name'?
            if (current.value.name.toLowerCase().includes(keyword.toLowerCase())) {
                console.log(`   - Found: ${current.value.name} (${current.value.phone})`);
                found = true;
            }
            current = current.next;
        }

        if (!found) console.log("   No matches found.");
    }

    // --- DISPLAY FORWARD (Head -> Tail) ---
    displayForward(): void {
        console.log("\n📜 Contacts (A-Z Order of Entry):");
        let current = this.head;
        while (current) {
            console.log(`   [${current.value.name}] : ${current.value.phone}`);
            current = current.next;
        }
    }

    // --- DISPLAY BACKWARD (Tail -> Head) ---
    displayBackward(): void {
        console.log("\n📜 Contacts (Reverse Order):");
        let current = this.tail;
        while (current) {
            console.log(`   [${current.value.name}] : ${current.value.phone}`);
            current = current.prev;
        }
    }
}

// --- TEST RUNNER (Simulating the Menu) ---
function runTest() {
    const manager = new ContactManager();

    console.log("--- 1. Adding Contacts ---");
    manager.addContact("Alice Johnson", "123-456");
    manager.addContact("Bob Smith", "789-012");
    manager.addContact("Charlie Brown", "345-678");
    manager.addContact("Alice Wonderland", "111-222"); // Similar name for search test

    console.log("--- 2. View All (Forward) ---");
    manager.displayForward();

    console.log("--- 3. View All (Backward) ---");
    manager.displayBackward();

    console.log("--- 4. Search Exact Name (Hash Table) ---");
    manager.searchByName("Bob Smith"); // Should find
    manager.searchByName("Zack Snyder"); // Should fail

    console.log("--- 5. Search Keyword 'Alice' (Substring Search) ---");
    manager.searchByKeyword("Alice"); 
}

// Execute the test
runTest();