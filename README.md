Frontend-(Next js)
Backend-(Python django)


* Backend *
 ## 📁 Folder Structure...............
 
├── backend/ # Django project (settings, urls)
├── products/ # Django app (models, views, serializers)
├── db.sqlite3 # Database
├── env/ # Python virtual environment (not pushed to Git)
├── manage.py
└── requirements.txt

### 1. Clone the Repository

> git clone https://github.com/shibinshanty/Product-List/tree/main/product-backend
> cd Product-List/product-backend

# Create virtual environment
> python -m venv env

 # Activate:
> env\Scripts\activate

 #Install Dependencies
 > pip install -r requirements.txt

#Run Migrations
> python manage.py migrate

#Run the Development Server
> python manage.py runserver


* Frontend *
 ## 📁 Folder Structure.........
 
 frontend/
├── pages/ # All Next.js pages (index.js, products/[id].js, add.js)
├── components/ # Reusable UI components (e.g. ProductsTable)
├── public/ # Static files
├── styles/ # Global styles if any
├── .env.local # Environment variables
├── package.json
└── README.md

### 1. Clone the Repository
> git clone https://github.com/shibinshanty/Product-List/tree/main/product-frontend
> cd Product-List/product-frontend

> npm install

> npm run dev

> npm run dev         


  

 
