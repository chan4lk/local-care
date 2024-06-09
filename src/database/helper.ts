
export function GenerateReferenceNumber(): string {
    const now = new Date();
    const random = Math.floor(Math.random() * 100);
    const referenceNumber = `REF-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(2, '0')}${random}`;
    return referenceNumber;
}