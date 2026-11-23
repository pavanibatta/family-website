// ==========================================
// FAMILY MEMBERS
// ==========================================


// ADD FAMILY MEMBER
function addMember() {

    const nameInput = document.getElementById("memberName");
    const relationInput = document.getElementById("memberRelation");
    const photoInput = document.getElementById("memberPhoto");

    const name = nameInput.value.trim();
    const relation = relationInput.value.trim();


    // Check details
    if (name === "") {
        alert("Please enter member name.");
        return;
    }

    if (relation === "") {
        alert("Please enter relation.");
        return;
    }

    if (photoInput.files.length === 0) {
        alert("Please select a photo.");
        return;
    }


    const photo = photoInput.files[0];

    const reader = new FileReader();


    reader.onload = function(event) {

        let members =
            JSON.parse(
                localStorage.getItem("familyMembers")
            ) || [];


        // Create new member
        const newMember = {

            id: Date.now(),

            name: name,

            relation: relation,

            photo: event.target.result

        };


        // Add new member
        members.push(newMember);


        // Save all members
        localStorage.setItem(
            "familyMembers",
            JSON.stringify(members)
        );


        // Show members
        displayMembers();


        // Clear inputs
        nameInput.value = "";

        relationInput.value = "";

        photoInput.value = "";


        alert("Family member added successfully ❤️");

    };


    reader.readAsDataURL(photo);
}



// DISPLAY MEMBERS
function displayMembers() {

    const membersContainer =
        document.getElementById("members");


    let members =
        JSON.parse(
            localStorage.getItem("familyMembers")
        ) || [];


    // Clear only member cards
    membersContainer.innerHTML = "";


    // No members
    if (members.length === 0) {

        membersContainer.innerHTML = `
            <p>No family members added yet ❤️</p>
        `;

        return;
    }


    // Display every member
    members.forEach(function(member) {

        const card =
            document.createElement("div");


        card.className = "member-card";


        card.innerHTML = `

            <img
                src="${member.photo}"
                alt="${member.name}"
                style="
                    width:150px;
                    height:150px;
                    object-fit:cover;
                    border-radius:50%;
                    display:block;
                    margin:auto;
                "
            >

            <h3>${member.name}</h3>

            <p>${member.relation}</p>

            <button
                onclick="deleteMember(${member.id})"
            >
                Delete ❌
            </button>

        `;


        membersContainer.appendChild(card);

    });

}



// DELETE MEMBER
function deleteMember(id) {

    let members =
        JSON.parse(
            localStorage.getItem("familyMembers")
        ) || [];


    // Remove selected member only
    members =
        members.filter(function(member) {

            return member.id !== id;

        });


    // Save remaining members
    localStorage.setItem(
        "familyMembers",
        JSON.stringify(members)
    );


    // Display again
    displayMembers();

}



// ==========================================
// FAMILY PHOTOS
// ==========================================


// ADD PHOTOS
function addPhotos() {

    const photoInput =
        document.getElementById("familyPhotos");


    const files = photoInput.files;


    if (files.length === 0) {

        alert("Please select family photos.");

        return;
    }


    let photos =
        JSON.parse(
            localStorage.getItem("familyPhotos")
        ) || [];


    let completed = 0;


    for (let i = 0; i < files.length; i++) {

        const reader = new FileReader();


        reader.onload = function(event) {

            photos.push(event.target.result);

            completed++;


            if (completed === files.length) {

                localStorage.setItem(
                    "familyPhotos",
                    JSON.stringify(photos)
                );


                displayPhotos();


                photoInput.value = "";


                alert(
                    "Family photos saved successfully 📸❤️"
                );

            }

        };


        reader.readAsDataURL(files[i]);

    }

}



// DISPLAY PHOTOS
function displayPhotos() {

    const gallery =
        document.getElementById("gallery");


    let photos =
        JSON.parse(
            localStorage.getItem("familyPhotos")
        ) || [];


    gallery.innerHTML = "";


    if (photos.length === 0) {

        gallery.innerHTML = `
            <p>No family photos added yet 📸</p>
        `;

        return;
    }


    photos.forEach(function(photo, index) {

        const container =
            document.createElement("div");


        container.className = "photo-card";


        container.innerHTML = `

            <img
                src="${photo}"
                alt="Family Photo"
                style="
                    width:200px;
                    height:200px;
                    object-fit:cover;
                    border-radius:15px;
                "
            >

            <br><br>

            <button
                onclick="deletePhoto(${index})"
            >
                Delete ❌
            </button>

        `;


        gallery.appendChild(container);

    });

}



// DELETE PHOTO
function deletePhoto(index) {

    let photos =
        JSON.parse(
            localStorage.getItem("familyPhotos")
        ) || [];


    photos.splice(index, 1);


    localStorage.setItem(
        "familyPhotos",
        JSON.stringify(photos)
    );


    displayPhotos();

}



// ==========================================
// LOAD SAVED DATA
// ==========================================

window.onload = function() {

    displayMembers();

    displayPhotos();

};