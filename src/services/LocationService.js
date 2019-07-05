export default class LocationService {
  static apiKey = "xYjOyFkZsPAdPSDbJrQsdGr0gT4fIe1uZBpBow0A";
  static url = "https://ip-location.icu/api/v1";
  static adressToGetIp = `${this.url}/user-info/?apiKey=${this.apiKey}`;

  static getIp() {
    console.log(this.adressToGetIp, "this.adressToGetIp");
    return fetch(this.adressToGetIp);
  }

  static getCity(ip) {
    console.log(
      `${this.url}/city/?apiKey=${this.apiKey}&ip=${ip}`,
      "`${this.url}/city/?apiKey=${this.apiKey}&ip=${ip}`"
    );
    return fetch(`${this.url}/city/?apiKey=${this.apiKey}&ip=${ip}`);
  }
}
