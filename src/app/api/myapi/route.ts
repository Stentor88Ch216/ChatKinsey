export const runtime = 'edge'


export async function GET(req: Request): Promise<Response> {

    return new Response("Hello world");
};

