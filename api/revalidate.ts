export default async function handler(req: { query: { secret: string | undefined; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; send: { (arg0: string): any; new(): any; }; }; revalidate: (arg0: string) => any; json: (arg0: { revalidated: boolean; }) => any; }) {
  // Protect with secret token
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Revalidate the homepage (add more paths if needed)
    await res.revalidate('/');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
