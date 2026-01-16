import java.util.HashMap;
import java.util.Map;

class Book {
    int id;
    String title;
    String author;
    int copies;

    Book(int id, String title, String author, int copies) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.copies = copies;
    }
}

public class LibraryManager {

    private Map<Integer, Book> books = new HashMap<>();

    public void addBook(int id, String title, String author, int copies) {
        if (books.containsKey(id)) {
            System.out.println("Book with this ID already exists.");
            return;
        }
        books.put(id, new Book(id, title, author, copies));
        System.out.println("Book added successfully.");
    }

    public void issueBook(int id) {
        Book book = books.get(id);
        if (book == null) {
            System.out.println("Book not found.");
            return;
        }
        if (book.copies <= 0) {
            System.out.println("No copies available.");
            return;
        }
        book.copies--;
        System.out.println("Book issued successfully.");
    }

    public void returnBook(int id) {
        Book book = books.get(id);
        if (book == null) {
            System.out.println("Book not found.");
            return;
        }
        book.copies++;
        System.out.println("Book returned successfully.");
    }

    public void listBooks() {
        for (Book book : books.values()) {
            System.out.println(
                book.id + " | " + book.title + " | " +
                book.author + " | Copies: " + book.copies
            );
        }
    }
}
