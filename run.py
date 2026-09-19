"""本地调试入口；生产环境使用 Gunicorn 加载 app。"""
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
