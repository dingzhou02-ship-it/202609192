def test_health_includes_database(client):
    response = client.get('/healthz')
    assert response.status_code == 200
    assert response.json == {'status': 'ok'}
