FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1
WORKDIR /srv/campus

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && useradd --create-home --uid 10001 campus
COPY --chown=campus:campus . .
USER campus
EXPOSE 8000

# 用 sh 读取脚本，避免 Windows checkout 丢失可执行位。
ENTRYPOINT ["sh", "deployment/entrypoint.sh"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--access-logfile", "-", "--error-logfile", "-", "run:app"]
