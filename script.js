// Function to mask passwords with asterisks
function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

// Function to copy text to clipboard
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

// Delete a password entry
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    const arrUpdated = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
};

// Display saved passwords in the table
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length === 0) {
        tb.innerHTML = "No Data To Show";
    } else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        arr.forEach((element) => {
            str += `<tr>
    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button">
    </td>
    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button">
    </td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button">
    </td>
    <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`;
        });
        tb.innerHTML += str;
    }
    website.value = "";
    username.value = "";
    password.value = "";
};

// Generate a strong password
function generatePassword(length = 12) {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    const allChars = lowerCase + upperCase + numbers + specialChars;
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}

// Event listener for generating password
document.getElementById("generate-password").addEventListener("click", () => {
    const newPassword = generatePassword();
    document.getElementById("password").value = newPassword;
    alert("Password Generated: " + newPassword);
});

// Event listener for saving passwords
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    let passwords = localStorage.getItem("passwords");
    const newPassword = password.value || document.getElementById("password").value;

    if (passwords == null) {
        let json = [];
        json.push({ website: website.value, username: username.value, password: newPassword });
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(passwords);
        json.push({ website: website.value, username: username.value, password: newPassword });
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    alert("Password Saved!");
    showPasswords();
});

showPasswords();
