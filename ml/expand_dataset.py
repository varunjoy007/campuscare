import pandas as pd

# ==========================================
# LOAD CURRENT DATASET
# ==========================================

data = pd.read_csv("dataset.csv")

print("Current dataset size:", len(data))


# ==========================================
# ADDITIONAL TRAINING DATA
# ==========================================

new_data = [

    # ======================================
    # SECURITY - 20
    # ======================================

    ["There is no security guard at the main college entrance", "Security"],
    ["The security guard is absent near the college gate", "Security"],
    ["The main gate is not being monitored by security staff", "Security"],
    ["The CCTV camera at the entrance is not working", "Security"],
    ["The CCTV camera in the parking area is not functioning", "Security"],
    ["The security camera is showing no display", "Security"],
    ["Visitors are entering without proper security checking", "Security"],
    ["The college visitor verification system is not working", "Security"],
    ["There is no security staff near the hostel entrance", "Security"],
    ["The parking area does not have proper security", "Security"],
    ["Security staff are not checking vehicles at the gate", "Security"],
    ["The college entrance needs better security monitoring", "Security"],
    ["The emergency security alarm is not working", "Security"],
    ["The security gate is not being monitored at night", "Security"],
    ["The security guard is not available during college hours", "Security"],
    ["The CCTV system near the laboratory is not working", "Security"],
    ["The visitor entry register is not being maintained properly", "Security"],
    ["The college gate security system needs repair", "Security"],
    ["There is a security issue near the parking area", "Security"],
    ["The security monitoring system is unavailable", "Security"],


    # ======================================
    # HOSTEL - 20
    # ======================================

    ["The hostel bathroom requires maintenance", "Hostel"],
    ["The hostel bathroom tap is damaged", "Hostel"],
    ["The hostel bathroom water supply is not working", "Hostel"],
    ["The hostel room door is difficult to close", "Hostel"],
    ["The hostel room window is broken", "Hostel"],
    ["The hostel room furniture needs repair", "Hostel"],
    ["The hostel cupboard door is damaged", "Hostel"],
    ["The hostel room bed is broken", "Hostel"],
    ["There is water leakage in the hostel bathroom", "Hostel"],
    ["The hostel corridor needs maintenance", "Hostel"],
    ["The hostel common room needs repair", "Hostel"],
    ["My hostel room has a maintenance problem", "Hostel"],
    ["The hostel room allocation has an error", "Hostel"],
    ["The hostel warden has not resolved my room issue", "Hostel"],
    ["The hostel water supply is interrupted", "Hostel"],
    ["The hostel room needs urgent maintenance", "Hostel"],
    ["The hostel bathroom door is damaged", "Hostel"],
    ["The hostel room ceiling needs repair", "Hostel"],
    ["The hostel accommodation has a maintenance issue", "Hostel"],
    ["The hostel facilities are not working properly", "Hostel"],


    # ======================================
    # EXAMINATION - 20
    # ======================================

    ["My exam hall ticket is not available", "Examination"],
    ["I am unable to download my hall ticket", "Examination"],
    ["My examination registration is incomplete", "Examination"],
    ["There is an error in my examination form", "Examination"],
    ["My exam timetable is incorrect", "Examination"],
    ["The examination schedule has not been published", "Examination"],
    ["My exam room is not mentioned", "Examination"],
    ["The exam seating arrangement is missing", "Examination"],
    ["I cannot view my examination results", "Examination"],
    ["My exam result is not displayed", "Examination"],
    ["There is a mistake in my hall ticket", "Examination"],
    ["My examination application cannot be submitted", "Examination"],
    ["The exam registration portal is showing an error", "Examination"],
    ["I cannot access my exam timetable", "Examination"],
    ["My examination details are incorrect", "Examination"],
    ["The examination admit card has incorrect details", "Examination"],
    ["My exam registration status is not updated", "Examination"],
    ["The examination result page is not working", "Examination"],
    ["I have not received my examination hall ticket", "Examination"],
    ["The exam schedule is not available on the portal", "Examination"],


    # ======================================
    # LIBRARY - 20
    # ======================================

    ["The library computer is not turning on", "Library"],
    ["The library printer is not functioning", "Library"],
    ["I cannot issue a book from the library", "Library"],
    ["The library book return system is not working", "Library"],
    ["My library account has incorrect information", "Library"],
    ["A textbook required for my course is unavailable", "Library"],
    ["I cannot search for books in the library system", "Library"],
    ["The library book availability information is incorrect", "Library"],
    ["The library website is not working", "Library"],
    ["The library reading room has insufficient seating", "Library"],
    ["The library needs additional study space", "Library"],
    ["The library computer system is unavailable", "Library"],
    ["The book issue counter system is not working", "Library"],
    ["My issued book is not showing in my library account", "Library"],
    ["The library return status is not updated", "Library"],
    ["The library printer is showing an error", "Library"],
    ["I cannot find the required textbook in the library", "Library"],
    ["The library database is not displaying books", "Library"],
    ["The library study area needs more seats", "Library"],
    ["The library book search system is not working", "Library"],


    # ======================================
    # INFRASTRUCTURE - 15
    # ======================================

    ["The classroom bench is damaged", "Infrastructure"],
    ["The classroom door needs repair", "Infrastructure"],
    ["The classroom wall has cracks", "Infrastructure"],
    ["The laboratory table is broken", "Infrastructure"],
    ["The classroom ceiling has damage", "Infrastructure"],
    ["The staircase railing is loose", "Infrastructure"],
    ["The classroom window is broken", "Infrastructure"],
    ["The college building needs structural repair", "Infrastructure"],
    ["The seminar hall chairs are damaged", "Infrastructure"],
    ["The classroom board is broken", "Infrastructure"],
    ["The corridor ceiling is damaged", "Infrastructure"],
    ["The laboratory furniture needs repair", "Infrastructure"],
    ["The college parking area has damaged flooring", "Infrastructure"],
    ["The classroom door handle is damaged", "Infrastructure"],
    ["The college building requires maintenance", "Infrastructure"],


    # ======================================
    # CLEANLINESS - 15
    # ======================================

    ["The hostel corridor is dirty", "Cleanliness"],
    ["The hostel bathroom is dirty", "Cleanliness"],
    ["The college washroom has not been cleaned", "Cleanliness"],
    ["Garbage is accumulating near the hostel", "Cleanliness"],
    ["The classroom floor is covered with dust", "Cleanliness"],
    ["The college corridor has garbage", "Cleanliness"],
    ["The laboratory floor needs cleaning", "Cleanliness"],
    ["The washroom has an unpleasant smell", "Cleanliness"],
    ["The garbage bins have not been emptied", "Cleanliness"],
    ["The classroom desks are dusty", "Cleanliness"],
    ["The college entrance area is dirty", "Cleanliness"],
    ["The staircase needs cleaning", "Cleanliness"],
    ["Waste is lying near the college building", "Cleanliness"],
    ["The parking area has accumulated garbage", "Cleanliness"],
    ["The college premises are not being cleaned properly", "Cleanliness"],


    # ======================================
    # INTERNET / WI-FI - 15
    # ======================================

    ["The Wi-Fi is unavailable in my classroom", "Internet / Wi-Fi"],
    ["The college Wi-Fi keeps disconnecting", "Internet / Wi-Fi"],
    ["I cannot log in to the college Wi-Fi", "Internet / Wi-Fi"],
    ["The internet connection is very slow", "Internet / Wi-Fi"],
    ["The Wi-Fi signal is weak in the classroom", "Internet / Wi-Fi"],
    ["The internet is not working in the laboratory", "Internet / Wi-Fi"],
    ["The Wi-Fi is not available in the library", "Internet / Wi-Fi"],
    ["The college network connection keeps dropping", "Internet / Wi-Fi"],
    ["My laptop cannot connect to campus Wi-Fi", "Internet / Wi-Fi"],
    ["The Wi-Fi login page is not opening", "Internet / Wi-Fi"],
    ["The internet connection is unstable", "Internet / Wi-Fi"],
    ["The Wi-Fi speed is too slow", "Internet / Wi-Fi"],
    ["The campus internet is unavailable", "Internet / Wi-Fi"],
    ["The college Wi-Fi network is not visible", "Internet / Wi-Fi"],
    ["The internet connection stops frequently", "Internet / Wi-Fi"],
]


# ==========================================
# CREATE DATAFRAME
# ==========================================

new_df = pd.DataFrame(
    new_data,
    columns=["text", "category"]
)


# ==========================================
# COMBINE OLD + NEW DATA
# ==========================================

combined_data = pd.concat(
    [data, new_df],
    ignore_index=True
)


# ==========================================
# REMOVE DUPLICATES
# ==========================================

combined_data = combined_data.drop_duplicates(
    subset=["text", "category"]
)


# ==========================================
# SAVE DATASET
# ==========================================

combined_data.to_csv(
    "dataset.csv",
    index=False
)


# ==========================================
# DISPLAY RESULT
# ==========================================

print("\nDataset expansion completed! ✅")

print(
    "New unique complaints added:",
    len(combined_data) - len(data)
)

print(
    "Total complaints:",
    len(combined_data)
)

print("\nCategory distribution:")

print(
    combined_data["category"].value_counts()
)