# ------------------------------------
#
#
# Alapvető adatbázis generátor
#
# Készítette Tóta Dávid
#
#
# ------------------------------------

# A projekten belül hol van az eredeti data.sql és az ideiglenesen létrehozott
datasql = 'src/main/resources/data.sql'
datasql_torolni = 'target/classes/data.sql'

# Alapbeállítások
tanarok_szama = 24
diakok_minimalis_szama_oszalyonkent = 3
diakok_maximalis_szama_oszalyonkent = 7
osztalyok = ['9/A', '9/B', '9/C', '10/A', '10/NY', '11/A', '11/B', '11/I', '11/NY', '12/A', '12/B', '12/CD', '13/NY']
jegyek_targyankent = 2

import unicodedata, random, os, time

gyakori_vezeteknevek = ['Nagy', 'Kovács', 'Tóth', 'Szabó', 'Horváth', 'Varga', 'Kiss', 'Molnár', 'Németh', 'Farkas', 'Balogh', 'Papp', 'Takács', 'Juhász', 'Lakatos', 'Mészáros', 'Oláh', 'Simon', 'Rácz', 'Fekete', 'Szilágyi', 'Török', 'Fehér', 'Balázs', 'Gál', 'Kis', 'Szűcs', 'Kocsis', 'Pintér', 'Fodor', 'Orsós', 'Szalai', 'Sipos', 'Magyar', 'Lukács', 'Gulyás', 'Bíró', 'Király', 'Katona', 'László', 'Jakab', 'Bogdán', 'Balog', 'Sándor', 'Boros', 'Fazekas', 'Kelemen', 'Antal', 'Somogyi', 'Váradi', 'Fülöp', 'Orosz', 'Vincze', 'Veres', 'Hegedűs', 'Deák', 'Budai', 'Pap', 'Bálint', 'Pál', 'Illés', 'Szőke', 'Vörös', 'Vass', 'Bognár', 'Lengyel', 'Fábián', 'Bodnár', 'Szücs', 'Hajdu', 'Halász', 'Jónás', 'Kozma', 'Máté', 'Székely', 'Gáspár', 'Pásztor', 'Bakos', 'Dudás', 'Major', 'Hegedüs', 'Virág', 'Orbán', 'Novák', 'Barna', 'Soós', 'Nemes', 'Tamás', 'Pataki', 'Faragó', 'Balla', 'Borbély', 'Kerekes', 'Szekeres', 'Barta', 'Péter', 'Csonka', 'Mezei', 'Dobos', 'Márton']

gyakori_ferfi_keresztnevek = ['László', 'István', 'József', 'János', 'Zoltán', 'Sándor', 'Gábor', 'Ferenc', 'Attila', 'Péter', 'Tamás', 'Zsolt', 'Tibor', 'András', 'Csaba', 'Imre', 'Lajos', 'György', 'Balázs', 'Gyula', 'Mihály', 'Károly', 'Róbert', 'Béla', 'Dávid', 'Dániel', 'Ádám', 'Krisztián', 'Miklós', 'Norbert', 'Bence', 'Máté', 'Pál', 'Szabolcs', 'Roland', 'Gergő', 'Antal', 'Bálint', 'Richárd', 'Márk', 'Levente', 'Gergely', 'Ákos', 'Viktor', 'Árpád', 'Géza', 'Márton', 'Kristóf', 'Jenő', 'Kálmán', 'Patrik', 'Martin', 'Milán', 'Barnabás', 'Dominik', 'Marcell', 'Ernő', 'Mátyás', 'Endre', 'Áron', 'Dezső', 'Botond', 'Nándor', 'Zsombor', 'Szilárd', 'Erik', 'Olivér', 'Alex', 'Vilmos', 'Ottó', 'Benedek', 'Dénes', 'Kornél', 'Bertalan', 'Benjámin', 'Zalán', 'Kevin', 'Adrián', 'Rudolf', 'Albert', 'Vince', 'Ervin', 'Győző', 'Zsigmond', 'Andor', 'Gusztáv', 'Szilveszter', 'Iván', 'Noel', 'Barna', 'Elemér', 'Arnold', 'Csongor', 'Ábel', 'Krisztofer', 'Emil', 'Tivadar', 'Hunor', 'Bendegúz', 'Henrik']

gyakori_noi_keresztnevek = ['Mária', 'Erzsébet', 'Katalin', 'Ilona', 'Éva', 'Anna', 'Zsuzsanna', 'Margit', 'Judit', 'Ágnes', 'Julianna', 'Andrea', 'Ildikó', 'Erika', 'Krisztina', 'Irén', 'Eszter', 'Magdolna', 'Mónika', 'Edit', 'Gabriella', 'Szilvia', 'Anita', 'Anikó', 'Viktória', 'Márta', 'Rozália', 'Tímea', 'Piroska', 'Ibolya', 'Klára', 'Tünde', 'Dóra', 'Zsófia', 'Gizella', 'Veronika', 'Alexandra', 'Csilla', 'Terézia', 'Nikolett', 'Melinda', 'Adrienn', 'Réka', 'Beáta', 'Marianna', 'Nóra', 'Renáta', 'Vivien', 'Barbara', 'Enikő', 'Bernadett', 'Rita', 'Brigitta', 'Edina', 'Hajnalka', 'Gyöngyi', 'Jolán', 'Petra', 'Orsolya', 'Etelka', 'Boglárka', 'Borbála', 'Noémi', 'Valéria', 'Teréz', 'Annamária', 'Fanni', 'Kitti', 'Nikoletta', 'Emese', 'Aranka', 'Laura', 'Lilla', 'Róza', 'Klaudia', 'Anett', 'Kinga', 'Zita', 'Beatrix', 'Zsanett', 'Rózsa', 'Emma', 'Dorina', 'Hanna', 'Lili', 'Sára', 'Irma', 'Bianka', 'Júlia', 'Györgyi', 'Henrietta', 'Diána', 'Luca', 'Mariann', 'Bettina', 'Dorottya', 'Virág', 'Jázmin', 'Sarolta', 'Evelin']

def felhasznalonev(nev):
    return ''.join((c for c in unicodedata.normalize('NFD', nev.lower().replace(' ', '')) if unicodedata.category(c) != 'Mn'))

def nevgeneralas(ferfi):
    if ferfi == True: return random.choice(gyakori_vezeteknevek) + ' ' + random.choice(gyakori_ferfi_keresztnevek)
    if ferfi == False: return random.choice(gyakori_vezeteknevek) + ' ' + random.choice(gyakori_noi_keresztnevek)
    
f = open(datasql, 'w')

# Osztályok
f.write("-- Osztályok\n")
f.write("    INSERT INTO enaplo_classes (id, name) VALUES (1, 'Tanárok');\n")
index = 2
for osztaly in osztalyok:
    f.write("    INSERT INTO enaplo_classes (id, name) VALUES (" + str(index) + ", '" + osztaly + "');\n")
    index += 1

f.write("\n")

# Felhasználók
f.write("-- Felhasználók\n")
f.write("    -- Admin\n")
f.write("        INSERT INTO enaplo_users (id, password, real_name, role, user_name, class_model_id) VALUES (1, '$2a$10$OeT18d1sjofQt4FToNXgfuW3bt40k43uzMCcABMxtj.mdTV.cRjw6', 'Adminisztrátor', 'ROLE_ADMIN', 'admin', 1);\n")
f.write("\n")

index = 2

# Tanárok
tanarok_azonositoi = []
f.write("    -- Tanárok\n")
for j in range(tanarok_szama):
    name = nevgeneralas(random.choice([True,False]))
    f.write("        INSERT INTO enaplo_users (id, password, real_name, role, user_name, class_model_id) VALUES (" + str(index) + ", '$2a$10$OeT18d1sjofQt4FToNXgfuW3bt40k43uzMCcABMxtj.mdTV.cRjw6', '" + name + "', 'ROLE_TEACHER', '" + felhasznalonev(name) + "', 1);\n")
    tanarok_azonositoi.append(index)
    index += 1

f.write("\n")
    
# Diákok
diakok_azonositoi = [] # Tárgyakhoz később
f.write("    -- Diákok\n")
osztaly_azonosito = 2
for osztaly in osztalyok:
    f.write("        -- " + osztaly + "\n")
    for j in range(random.randint(diakok_minimalis_szama_oszalyonkent,diakok_maximalis_szama_oszalyonkent)):
        name = nevgeneralas(random.choice([True,False]))
        f.write("            INSERT INTO enaplo_users (id, password, real_name, role, user_name, class_model_id) VALUES (" + str(index) + ", '$2a$10$OeT18d1sjofQt4FToNXgfuW3bt40k43uzMCcABMxtj.mdTV.cRjw6', '" + name + "', 'ROLE_STUDENT', '" + felhasznalonev(name) + "', " + str(osztaly_azonosito) + ");\n")
        diakok_azonositoi.append(index)
        index += 1
    osztaly_azonosito += 1
    f.write("\n")
    
f.write("\n")

# Tantárgyak
tantargyak_azonositoi = []
tantargyak = ['Irodalom', 'Nyelvtan', 'Matematika', 'Történelem', 'Angol', 'Német', 'Informatika', 'Fizika', 'Kémia', 'Biológia', 'Földrajz', 'Testnevelés', 'Ének', 'Rajz']

f.write("-- Tantárgyak\n")
index = 1
for tantargy in tantargyak:
    f.write("    INSERT INTO enaplo_subjects (id, name, icon) VALUES (" + str(index) + ", '" + tantargy + "', '');\n")
    tantargyak_azonositoi.append(index)
    index += 1

f.write("\n")


# Tantárgyak és diákok közötti kapcsolat
# Egyelőre minden diákhoz tartozzon minden tantárgy...
f.write("-- Tantárgyak és diákok közötti kapcsolat\n")
for diak_azon in diakok_azonositoi:
    for tantargy_azon in tantargyak_azonositoi:
        f.write("    INSERT INTO enaplo_users_subjects (users_id, subjects_id) VALUES (" + str(diak_azon) + ", " + str(tantargy_azon) + ");\n")
f.write("\n")


# Osztályzatok
index = 1
f.write("-- Osztályzatok\n")
jegy_tipusok = ['Dolgozat', 'Felelés', 'Témazáró']
jegyek = list(range(1,6))
for diak_azon in diakok_azonositoi:
    f.write("    -- Diák: " + str(diak_azon) + "\n")
    for tantargy_azon in tantargyak_azonositoi:
        for t in range(jegyek_targyankent):
            f.write("        INSERT INTO enaplo_marks (id, timestamp, description, mark, student_user_id, teacher_user_id, subject_id) VALUES (" + str(index) + ", " + str(int(round(time.time() * 1000))) + ", '" + str(random.choice(jegy_tipusok)) + "', " + str(random.choice(jegyek)) + ", " + str(diak_azon) + ", " + str(random.choice(tanarok_azonositoi)) + ", " + str(tantargy_azon) + ");\n")
            index += 1
f.write("\n")

f.close()

