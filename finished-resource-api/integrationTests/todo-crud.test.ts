import { suite, test, before, after } from 'node:test';
import { strictEqual, ok } from 'node:assert/strict';
import { setupHarperWithFixture, teardownHarper, type ContextWithHarper } from '@harperfast/integration-testing';
import { fileURLToPath } from 'node:url';

// Use the "finished-resource-api" directory as the fixture (parent of this integrationTests dir)
const FIXTURE_PATH = fileURLToPath(new URL('../', import.meta.url));

function authFetch(ctx: ContextWithHarper, path: string, init: RequestInit & { headers?: Record<string, string> } = {}): Promise<Response> {
    const { headers = {}, ...rest } = init;
    const creds = Buffer.from(`${ctx.harper.admin.username}:${ctx.harper.admin.password}`).toString('base64');
    return fetch(`${ctx.harper.httpURL}${path}`, { ...rest, headers: { Authorization: `Basic ${creds}`, ...headers } });
}

void suite('harper-todo-example', (ctx: ContextWithHarper) => {
    before(async () => {
        await setupHarperWithFixture(ctx, FIXTURE_PATH, { startupTimeoutMs: 60000 });
    });

    after(async () => {
        await teardownHarper(ctx);
    });

    void test('PUT /TodoList/:id creates a todo item', async () => {
        const res = await authFetch(ctx, '/TodoList/test-todo-1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 'test-todo-1', description: 'Test todo item', status: 'pending' }),
        });
        ok([200, 201, 204].includes(res.status), `expected 200/201/204, got ${res.status}`);
    });

    void test('GET /TodoList/:id retrieves the todo item', async () => {
        const res = await authFetch(ctx, '/TodoList/test-todo-1');
        strictEqual(res.status, 200);
        const body = await res.json();
        strictEqual(body.id, 'test-todo-1');
    });

    void test('GET /TodoList/ returns array', async () => {
        const res = await authFetch(ctx, '/TodoList/');
        strictEqual(res.status, 200);
        const body = await res.json();
        ok(Array.isArray(body), `expected array, got ${JSON.stringify(body)}`);
    });

    void test('DELETE /TodoList/:id removes the item', async () => {
        const res = await authFetch(ctx, '/TodoList/test-todo-1', { method: 'DELETE' });
        ok([200, 204].includes(res.status), `expected 200 or 204, got ${res.status}`);
    });
});
