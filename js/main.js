var contactNameInput = document.getElementById("fullName");
var contactNumberInput = document.getElementById("phoneNumber");
var contactEmailInput = document.getElementById("emailAddress");
var contactAddressInput = document.getElementById("Address");
var contactGroupInput = document.getElementById("Group");
var contactNotesInput = document.getElementById("Notes");
var contactImageInput = document.getElementById("change-photo");
var contactFavInput = document.getElementById("fav");
var contactEmargInput = document.getElementById("emarg");
var searchInput = document.getElementById("searchInput");

var totalCount = document.getElementById("total");
var favoriteCount = document.getElementById("favorite-count");
var emergencyCount = document.getElementById("Emar-count");

var favorite = document.getElementById("favorite");
var emarj = document.getElementById("emarj");

var currentIndex = 0;
var favIndex = 0;

var isEditMode = false;

var contacts = document.getElementById("contacts");

var allContacts = JSON.parse(localStorage.getItem("allContacts")) || [];
displayContacts(allContacts);

displayFavorites();
displayEmergency();
displayCounts();
function createContact() {
  var contact = {
    name: contactNameInput.value,
    phone: contactNumberInput.value,
    email: contactEmailInput.value,
    address: contactAddressInput.value,
    note: contactNotesInput.value,
    image: contactImageInput.files[0]?.name || "contact-image.jpg",
    fav: contactFavInput.checked,
    emergency: contactEmargInput.checked,
    contactGroup: contactGroupInput.value,
  };

  allContacts.push(contact);
  handleLocalStorage();
  displayContacts(allContacts);
  displayFavorites();
  displayEmergency();
  clearInput();

  Swal.fire({
    icon: "success",
    title: "Contact Added",
    text: "The contact has been added successfully.",
    timer: 1500,
    showConfirmButton: false,
  });
  displayCounts();
}

function displayContacts(contactArr) {
  var temp = ``;
  for (var i = 0; i < contactArr.length; i++) {
    temp += `<div class="contact-card col-12 col-sm-6 p-2">
                <div class="inner p-3 rounded-4">
                  <div>
                    <div class="d-flex gap-3 align-items-start">
                      <div class="position-relative">
                        <img src="images/${contactArr[i].image}" alt="contact image" class="rounded-4 col-12" />
                        <div
                          id="showFav"
                           class="fav-pos fav-emer-icon bg-white rounded-circle border border-3 border-white position-absolute ${
                             contactArr[i].fav ? "" : "d-none"
                           }"">
                          <div class="d-flex justify-content-center align-items-center bg-warning rounded-circle">
                            <i class="fa-solid fa-star text-white"></i>
                          </div>
                        </div>
                        <div
                          id="showEmer"
                          <div
                          class="emergency-pos fav-emer-icon bg-white rounded-circle border border-3 border-white position-absolute ${
                            contactArr[i].emergency ? "" : "d-none"
                          }">
                          <div class="d-flex justify-content-center align-items-center bg-danger rounded-circle">
                            <i class="fa-solid fa-heart-pulse text-white"></i>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 class="fs-5">${contactArr[i].name}</h3>
                        <div class="d-flex align-items-center gap-2">
                          <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                            <i class="fa-solid fa-phone text-primary small"></i>
                          </div>
                          <span class="text-secondary fw-medium">${contactArr[i].phone}</span>
                        </div>
                      </div>
                    </div>
                    <div class="pt-2 d-flex align-items-center gap-2">
                      <div class="bg-main p-1 px-2 rounded-2 fit-content">
                        <i class="fa-solid fa-envelope text-purple small"></i>
                      </div>
                      <span class="text-secondary">${contactArr[i].email}</span>
                    </div>
                    <div class="pt-2 d-flex align-items-center gap-2">
                      <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                        <i class="fa-solid fa-location-dot text-success small"></i>
                      </div>
                      <span class="text-secondary">${contactArr[i].address}</span>
                    </div>
                    <div class="py-3 d-flex gap-3">
                      <div class="bg-main p-1 px-2 rounded-2 fit-content">
                        <span class="small text-purple">${contactArr[i].contactGroup}</span>
                      </div>
                      <div class="bg-danger bg-opacity-10 p-1 px-2 rounded-2 fit-content ${contactArr[i].emergency ? "" : "d-none"}">
                        <span class="small  text-danger fw-bold "><i class="fa-solid fa-heart-pulse text-danger"></i> Emergency</span>
                      </div>
                    </div>
                  </div>
                  <div class="border-top border-1 border-secondary border-opacity-10 pt-3">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex gap-3">
                        <a href="tel:${contactArr[i].phone}"
                          class="phone-hover bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content d-inline-block">
                          <i class="fa-solid fa-phone text-success small"></i>
                        </a>
                        <a href="mailto:${contactArr[i].email}"
                          class="email-hover bg-opacity-10 py-1 px-2 rounded-2 fit-content d-inline-block">
                          <i class="fa-solid fa-envelope text-purple small"></i>
                        </a>
                      </div>
                      <div class="d-flex gap-3 align-items-center">
                        <button onclick="displayFavContact(${i})" class=" border-0 width-height rounded-3 d-flex justify-content-center align-items-center ${contactArr[i].fav ? "bg-warning bg-opacity-10  p-2 text-center fav-hover-added" : " fav-hover-bef bg-transparent"}">
                          <i class="${contactArr[i].fav ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-secondary"}  "></i>
                        </button>
                        <button onclick="displayEmergencyContact(${i})" class="border-0 width-height rounded-3 d-flex justify-content-center align-items-center ${contactArr[i].emergency ? "bg-danger bg-opacity-10 text-danger emergency-hover-added p-2 text-center " : "emergency-hover-bef bg-transparent"}">
                          <i class="${contactArr[i].emergency ? "fa-solid fa-heart-pulse text-danger" : "fa-regular fa-heart text-secondary"}  "></i>
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onclick="updateContact(${i})"
                          class="edit-hover border-0 bg-transparent width-height">
                          <i class="fa-solid fa-pen text-secondary"></i>
                        </button>
                        <button onclick="deleteContact(${i})" class="delete-hover border-0 bg-transparent width-height">
                          <i class="fa-solid fa-trash text-secondary"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  contacts.innerHTML = temp;
}

function clearInput() {
  contactNameInput.value = "";
  contactNumberInput.value = "";
  contactEmailInput.value = "";
  contactAddressInput.value = "";
  contactNotesInput.value = "";
  contactGroupInput.value = "";
  contactImageInput.value = "";
  contactFavInput.checked = false;
  contactEmargInput.checked = false;
}

function updateContact(index) {
  currentIndex = index;
  isEditMode = true;
  contactNameInput.value = allContacts[index].name;
  contactNumberInput.value = allContacts[index].phone;
  contactEmailInput.value = allContacts[index].email;
  contactAddressInput.value = allContacts[index].address;
  contactNotesInput.value = allContacts[index].note;
  contactGroupInput.value = allContacts[index].contactGroup;
  contactFavInput.checked = allContacts[index].fav;
  contactEmargInput.checked = allContacts[index].emergency;

  console.log(contactNameInput.value);
}
function onUpdateContactClicked() {
  var contact = {
    name: contactNameInput.value,
    phone: contactNumberInput.value,
    email: contactEmailInput.value,
    address: contactAddressInput.value,
    note: contactNotesInput.value,
    image: contactImageInput.files[0]?.name || allContacts[currentIndex].image,
    fav: contactFavInput.checked,
    emergency: contactEmargInput.checked,
    contactGroup: contactGroupInput.value,
  };

  allContacts.splice(currentIndex, 1, contact);
  handleLocalStorage();
  displayContacts(allContacts);
  displayFavorites();
  displayEmergency();
  clearInput();
  displayCounts();

  Swal.fire({
    icon: "success",
    title: "Contact Updated",
    text: "Changes saved successfully.",
    timer: 1500,
    showConfirmButton: false,
  });
}

function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete ok? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      allContacts.splice(index, 1);

      handleLocalStorage();
      displayContacts(allContacts);
      displayFavorites();
      displayEmergency();
      displayCounts();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Contact has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

// Local Storage
function handleLocalStorage() {
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
}

function onSaveClicked() {
  if (isEditMode) {
    onUpdateContactClicked();
    isEditMode = false;
  } else {
    createContact();
  }
}

function displayFavorites() {
  var temp = "";

  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].fav) {
      temp += `
        <div class="col-6 col-xl-12 g-2 ">
          <div href="tel:${allContacts[i].email}" class="contact fav-cont p-3 d-flex align-items-center justify-content-between gap-2 rounded-3">
            <img src="images/${allContacts[i].image}" alt="favorite image" class="rounded-2">
            <div class="contact-info me-auto">
              <h6 class="small fw-medium m-0">${allContacts[i].name}</h6>
              <p class="text-secondary m-0">${allContacts[i].phone}</p>
            </div>
            <a href="tel:${allContacts[i].email}" class=" text-decoration-none call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-phone text-success"></i>
            </a>
          </div>
        </div>
      `;
    }
  }

  favorite.innerHTML = temp;
}

function displayFavContact(index) {
  allContacts[index].fav = !allContacts[index].fav;

  handleLocalStorage();
  displayContacts(allContacts);
  displayFavorites();
  displayCounts();
}

function displayEmergency() {
  var temp = "";

  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].emergency) {
      temp += `
        <div class="col-6 col-xl-12 g-2 ">
          <div class="contact emer-cont border p-3 d-flex align-items-center justify-content-between gap-2 rounded-3">
            <img src="images/${allContacts[i].image}" alt="favorite image" class="rounded-2">
            <div class="contact-info me-auto">
              <h6 class="small fw-medium m-0">${allContacts[i].name}</h6>
              <p class="text-secondary m-0">${allContacts[i].phone}</p>
            </div>
            <a href="tel:${allContacts[i].email}" class=" text-decoration-none call-bg bg-danger bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-phone text-danger"></i>
            </a>
          </div>
        </div>
      `;
    }
  }

  emarj.innerHTML = temp;
}

function displayEmergencyContact(index) {
  allContacts[index].emergency = !allContacts[index].emergency;

  handleLocalStorage();
  displayContacts(allContacts);
  displayEmergency();
  displayCounts();
}

//Regex

var contactRegex = {
  name: /^[A-Za-z\s]{2,50}$/,
  phone: /^01[0125][0-9]{8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

function validateInput(element, key) {
  var res = contactRegex[key].test(element.value);

  if (res) {
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.nextElementSibling.classList.remove("d-none");
  }

  return res;
}

// search
function filterContacts() {
  var filteredContactsArr = [];
  var searchValue = searchInput.value.toLowerCase();

  for (var i = 0; i < allContacts.length; i++) {
    if (
      allContacts[i].name.toLowerCase().includes(searchValue) ||
      allContacts[i].email.toLowerCase().includes(searchValue) ||
      allContacts[i].phone.includes(searchValue)
    ) {
      filteredContactsArr.push(allContacts[i]);
    }
  }

  displayContacts(filteredContactsArr);
}
function displayCounts() {
  totalCount.innerHTML = allContacts.length;

  var fav = 0;
  var emergency = 0;

  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].fav) {
      fav++;
    }

    if (allContacts[i].emergency) {
      emergency++;
    }
  }

  favoriteCount.innerHTML = fav;
  emergencyCount.innerHTML = emergency;
}
