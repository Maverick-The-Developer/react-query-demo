# react query 사용의 예

서버는 fastapi로 구성, 클라이언트는 react(vite)로 구성함.

## 실행
1. 클론 후,  
2. client 디렉토리에서  
npm install 실행.
3. server 디렉토리에서  
venv생성 및 activate 후,  
pip install fastapi sqlmodel "uvicorn[standard]"  
를 실행하여, 패키지 설치

4. 각각의 디렉토리에서  
npm run dev  
python main.py  
를 각각 실행하여 테스트함.
