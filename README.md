Getting Started
-------------------------------------------------------------------------------

In **git-root** :

```sh
npm ci
```

In **sdk/** :

```sh
python3 -m venv .
source ./bin/activate
pip install -r requirements.txt
```


How to Use
-------------------------------------------------------------------------------

In **sdk/** :

```sh
source ./bin/activate
python3 generate_stocks_csv.py {{ KEYCHAIN_LABEL }}
```

In **git-root** :

```sh
npm run start
```
