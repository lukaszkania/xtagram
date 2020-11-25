Do porawnego działania aplikacji potrzebny jest zainstalowany python oraz node.js.

Konfiguracja Django.
1. Przez CMD wejść do folderu api
2. Utworzyć wirtualne środowisko wpisując: 
python -m venv [ścieżka do pliku, np. python -m venv C:\Users\Lukasz\Desktop\xtagram\api\env]
3. Będąc w folderze xtagram/api/env/Scripts aktywować wirtualne środowisko używając skryptu:
activate.bat
4. Zainstalować packages z pliku requirements.txt znajdującego się w folderze api wpisując:
pip install -r requirements.txt
5. Będać w folderze: api\django_xtagram_api> Wpisać komendę:
python manage.py runserver

Konfiguracja React:
6. W drugim oknie CMD, przejść do folderu xtagram
7. Wpisać:
npm install package.json
8. Wpisać npm start
